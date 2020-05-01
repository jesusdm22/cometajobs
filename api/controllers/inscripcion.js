'use strict'

// Librerias
//var path = require('path');
//var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');

//Modelos
var Usuario = require('../models/usuario.js');
var Inscripcion = require('../models/inscripcion.js');


//Funcion para realizar una inscripcion
function saveInscripcion(req, res) {

    var params = req.body; // Recogemos por post
    var inscripcion = new Inscripcion(); // Nueva inscripcion

    // Seteamos los valores de la inscripcion 
    inscripcion.usuario = req.user.sub;
    inscripcion.oferta = params.oferta;

    //Guardamos en la base de datos
    inscripcion.save((err, inscripcionStored) => {
        if (err)// Si hay algun error
            return res.status(500).send({ message: 'Error al realizar la inscripcion' });

        if (!inscripcionStored)// Si no se pudo guardar el follow
            return res.status(404).send({ message: 'La inscripcion no se ha guardado' });

        return res.status(200).send({ message: inscripcionStored }); // Inscripcion exitosa
    });
}

//Funcion para obtener todas las inscripciones
function getInscripciones(req, res) {
    var page = 1;

    if (req.params.page)
        page = req.params.page;

    var itemsPerPage = 4;


    Inscripcion.find().paginate(page, itemsPerPage, (err, inscripciones, total) => {
        if (err)
            return res.status(500).send({ message: 'Error al devolver las inscripciones' });
        if (!inscripciones)
            return res.status(404).send({ message: 'No hay inscripciones' });

        return res.status(200).send({
            total_items: total,
            pages: Math.ceil(total / itemsPerPage),
            page: page,
            items_per_page: itemsPerPage,
            inscripciones

        });
    });
}

// Funcion para obtener una inscripcion en concreto 
function getInscripcion(req, res) {

    var inscripcionId = req.params.id; //Obtenemos el id de la inscripcion por la url

    Inscripcion.findById(inscripcionId, (err, inscripcion) => { // La buscamos en la base de datos
        if (err)// Error en server
            return res.status(500).send({ message: 'Error al devolver la inscripcion' });

        if (!inscripcion) //No encontrado
            return res.status(404).send({ message: 'La inscripcion no existe' });

        return res.status(200).send({ inscripcion }); //Devolvemos la inscripcion
    });
}

//Funcion para devolver el listado de inscripciones del usuario logueado
function getMisInscripciones(req, res) {

    var userId = req.user.sub; // Usuario logueado (id)

    var find = Inscripcion.find({ usuario: userId });

    // Query
    find.populate('usuario oferta empresa').exec((err, inscripciones) => {
        if (err) // Error en el servidor
            return res.status(500).send({ message: 'Error en el servidor' });
        if (!inscripciones)// Lista vacia
            return res.status(404).send({ message: 'No tienes ninguna inscripcion' });

        return res.status(200).send({ inscripciones }); // Mostramos la lista de inscripciones
    });
}


// Funcion para eliminar una inscripcion
function deleteInscripcion(req, res) {
    var inscripcionId = req.params.id; //ID de la inscripcion

    //Buscamos por ID
    Inscripcion.find({ '_id': inscripcionId }).remove((err, inscripcionRemoved) => {
        //Error
        if (err) return res.status(500).send({ message: 'Error al intentar eliminar la inscripcion' });
        //No encontrada
        if (!inscripcionRemoved) return res.status(404).send({ message: 'La inscripcion no existe o ya ha sido eliminada' });
        //Exito
        return res.status(200).send({ message: 'La inscripcion ha sido eliminada' });
    });
}

module.exports = {
    saveInscripcion,
    getInscripciones,
    getInscripcion,
    getMisInscripciones,
    deleteInscripcion
}