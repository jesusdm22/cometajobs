'use strict'

// Librerias
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePagination = require('mongoose-pagination');

//Modelos
var Oferta = require('../models/oferta');
var User = require('../models/usuario');

//Crear oferta
function saveOferta(req, res) {

    var params = req.body; // Recogemos los datos desde post 
    if (!params.titulo)
        return res.status(200).send({ message: 'Debes enviar un titulo' });

    // Seteamos la publicacion con los datos que llegaron por post
    var oferta = new Oferta();
    oferta.titulo = params.titulo;
    oferta.descripcion = params.descripcion;
    oferta.experiencia = params.experiencia;
    oferta.sueldo = params.sueldo;
    oferta.ubicacion = params.ubicacion;
    oferta.jornada = params.jornada;
    oferta.created_at = moment().unix();
    oferta.empresa = req.user.sub;

    oferta.save((err, ofertaStored) => {

        if (err)
            return res.status(500).send({ message: 'Error al guardar la oferta' });

        if (!ofertaStored)
            return res.status(404).send({ message: 'La oferta no se ha guardado' });

        return res.status(200).send({ oferta: ofertaStored });
    });
}


//Crear publicacion
function saveOfertaAdmin(req, res) {

    var params = req.body; // Recogemos los datos desde post 
    if (!params.titulo)
        return res.status(200).send({ message: 'Debes enviar un titulo' });

    // Seteamos la publicacion con los datos que llegaron por post
    var oferta = new Oferta();
    oferta.titulo = params.titulo;
    oferta.descripcion = params.descripcion;
    oferta.experiencia = params.experiencia;
    oferta.sueldo = params.sueldo;
    oferta.ubicacion = params.ubicacion;
    oferta.jornada = params.jornada;
    oferta.created_at = moment().unix();
    oferta.empresa = params.empresa;

    oferta.save((err, ofertaStored) => {

        if (err)
            return res.status(500).send({ message: 'Error al guardar la oferta' });

        if (!ofertaStored)
            return res.status(404).send({ message: 'La oferta no se ha guardado' });

        return res.status(200).send({ oferta: ofertaStored });
    });
}


function getOfertasByUser(req, res) {
    var page = 1;

    if (req.params.page)
        page = req.params.page;

    var itemsPerPage = 4;
    var user = req.user.sub;
    if (req.params.userId) {
        user = req.params.userId;
    }


    Oferta.find({ empresa: user }).sort('-created_at').populate('empresa').paginate(page, itemsPerPage, (err, ofertas, total) => {
        if (err)
            return res.status(500).send({ message: 'Error al devolver las ofertas' });
        if (!ofertas)
            return res.status(404).send({ message: 'No hay publicaciones' });

        return res.status(200).send({
            total_items: total,
            pages: Math.ceil(total / itemsPerPage),
            page: page,
            items_per_page: itemsPerPage,
            ofertas

        });
    });

}

function getOfertas(req, res) {
    var page = 1;

    if (req.params.page)
        page = req.params.page;

    var itemsPerPage = 4;


    Oferta.find().sort('created_at').populate('empresa jornada').exec((err, ofertas, total) => {
        if (err)
            return res.status(500).send({ message: 'Error al devolver las ofertas' });
        if (!ofertas)
            return res.status(404).send({ message: 'No hay ofertas' });

        return res.status(200).send({
            total_items: total,
            ofertas

        });
    });
}


// Funcion para obtener una oferta 
function getOferta(req, res) {

    var ofertaId = req.params.id; //Obtenemos el id de la oferta por la url

    Oferta.findById(ofertaId).populate('empresa jornada').exec((err, oferta) => { // La buscamos en la base de datos
        if (err)// Error en server
            return res.status(500).send({ message: 'Error al devolver oferta' });

        if (!oferta) //No encontrado
            return res.status(404).send({ message: 'La oferta no existe' });

        return res.status(200).send({ oferta }); //Devolvemos la oferta
    });
}

// Funcion para actualizar datos de un usuario
function updateOferta(req, res) {

    var ofertaId = req.params.id;
    var update = req.body;

    // Si son iguales, buscamos y actualizamos ({new:true} devuelve la oferta actualizado, false el original)
    Oferta.findByIdAndUpdate(ofertaId, update, { new: true, useFindAndModify: false }).exec((err, ofertaUpdated) => {

        if (err)// Si hay error
            return res.status(500).send({ message: 'Error en la peticion' });
        if (!ofertaUpdated)// Si no se ha podido actualizar el usuario
            return res.status(404).send({ message: 'No se ha podido actualizar la oferta' });

        return res.status(200).send({ message: ofertaUpdated }); // Devolvemos el usuario
    });

}

// Funcion para eliminar una oferta
function deleteOferta(req, res) {
    var ofertaId = req.params.id;

    Oferta.find({ '_id': ofertaId }).remove((err, ofertaRemoved) => {

        if (err) return res.status(500).send({ message: 'Error al intentar eliminar la oferta' });

        if (!ofertaRemoved) return res.status(404).send({ message: 'La oferta no existe o ya ha sido eliminada' });

        return res.status(200).send({ message: 'La oferta ha sido eliminada' });
    });
}


function getOfertasByUser(req, res) {
    var page = 1;

    if (req.params.page)
        page = req.params.page;

    var itemsPerPage = 4;
    var user = req.user.sub;
    if (req.params.userId) {
        user = req.params.userId;
    }


    Oferta.find({ empresa: user }).populate('user').paginate(page, itemsPerPage, (err, ofertas, total) => {
        if (err)
            return res.status(500).send({ message: 'Error al devolver ofertas' });
        if (!ofertas)
            return res.status(404).send({ message: 'No hay ofertas' });

        return res.status(200).send({
            total_items: total,
            pages: Math.ceil(total / itemsPerPage),
            page: page,
            items_per_page: itemsPerPage,
            ofertas

        });
    });

}


//Funcion para devolver el listado de inscripciones del usuario logueado
function getMisOfertas(req, res) {

    var userId = req.user.sub; // Usuario logueado (id)

    var find = Oferta.find({ empresa: userId });

    // Query
    find.exec((err, ofertas) => {
        if (err) // Error en el servidor
            return res.status(500).send({ message: 'Error en el servidor' });
        if (!ofertas)// Lista vacia
            return res.status(404).send({ message: 'No tienes ninguna oferta' });

        return res.status(200).send({ ofertas }); // Mostramos la lista de inscripciones
    });
}

module.exports = {
    saveOferta,
    saveOfertaAdmin,
    getOfertas,
    getOferta,
    updateOferta,
    deleteOferta,
    getOfertasByUser,
    getMisOfertas
}
