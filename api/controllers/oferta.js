'use strict'

// Librerias
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var mongoosePagination = require('mongoose-pagination');

//Modelos
var Oferta = require('../models/oferta');
var User = require('../models/usuario');

//Crear publicacion
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


    Oferta.find().sort('created_at').populate('empresa jornada').paginate(page, itemsPerPage, (err, ofertas, total) => {
        if (err)
            return res.status(500).send({ message: 'Error al devolver las ofertas' });
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


// Funcion para obtener una publicacion 
function getOferta(req, res) {

    var ofertaId = req.params.id; //Obtenemos el id de la publicacion por la url

    Oferta.findById(ofertaId, (err, oferta) => { // La buscamos en la base de datos
        if (err)// Error en server
            return res.status(500).send({ message: 'Error al devolver publicaciones' });

        if (!oferta) //No encontrado
            return res.status(404).send({ message: 'La publicacion no existe' });

        return res.status(200).send({ oferta }); //Devolvemos la publicacion
    });
}

// Funcion para actualizar datos de una oferta
function updateOferta(req, res) {

    var ofertaId = req.params.id; //Obtenemos el id de la oferta por la url
    var update = req.body; //Datos nuevos que nos llegan por post


    // Si no hay token
    if (!req.user.sub)
        return res.status(500).send({ message: 'No tienes permiso para actualizar los datos de esta oferta' });

    // Buscamos y actualizamos ({new:true} devuelve la oferta actualizado, false el original)
    Oferta.findByIdAndUpdate(ofertaId, update, { new: true, useFindAndModify: false }, (err, ofertaUpdated) => {

        if (err)// Si hay error
            return res.status(500).send({ message: 'Error en la peticion' });
        if (!ofertaUpdated)// Si no se ha podido actualizar la oferta
            return res.status(404).send({ message: 'No se ha podido actualizar la oferta' });

        return res.status(200).send({ message: ofertaUpdated }); // Devolvemos la oferta
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


    Oferta.find({ empresa: user }).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, ofertas, total) => {
        if (err)
            return res.status(500).send({ message: 'Error al devolver publicaciones' });
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

module.exports = {
    saveOferta,
    getOfertas,
    getOferta,
    updateOferta,
    deleteOferta,
    getOfertasByUser
}
