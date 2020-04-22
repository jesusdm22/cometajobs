'use strict';

// Librerias
var mongoosePagination = require('mongoose-pagination');

//Modelos
var Ubicacion = require('../models/ubicacion.js');



//Crear ubicacion
function saveUbicacion(req, res) {

    var params = req.body; // Recogemos los datos desde post 
    if (!params.ubicacion)
        return res.status(200).send({ message: 'Debes enviar un nombre de ubicacion' });

    // Seteamos la ubicacion con los datos que llegaron por post
    var ubicacion = new Ubicacion();
    ubicacion.ubicacion = params.ubicacion;

    ubicacion.save((err, ubicacionStored) => {

        if (err)
            return res.status(500).send({ message: 'Error al guardar la ubicacion' });

        if (!ubicacionStored)
            return res.status(404).send({ message: 'La ubicacion no se ha guardado' });

        return res.status(200).send({ ubicacion: ubicacionStored });
    });
}

//Funcion para obtener todas las ubicaciones
function getUbicaciones(req, res) {
    var page = 1;

    if (req.params.page)
        page = req.params.page;

    var itemsPerPage = 4;

        Ubicacion.find().paginate(page, itemsPerPage, (err, ubicaciones, total) => {
                if (err)
                    return res.status(500).send({ message: 'Error al devolver las ubicaciones' });
                if (!ubicaciones)
                    return res.status(404).send({ message: 'No hay ubicaciones' });

                return res.status(200).send({
                    total_items: total,
                    pages: Math.ceil(total / itemsPerPage),
                    page: page,
                    items_per_page: itemsPerPage,
                    ubicaciones

                });
            });
}


// Funcion para obtener una ubicacion en concreto 
function getUbicacion(req, res) {

    var ubicacionId = req.params.id; //Obtenemos el id de la ubicacion por la url

    Ubicacion.findById(ubicacionId, (err, ubicacion) => { // La buscamos en la base de datos
        if (err)// Error en server
            return res.status(500).send({ message: 'Error al devolver la ubicacion' });

        if (!ubicacion) //No encontrado
            return res.status(404).send({ message: 'La ubicacion no existe' });

        return res.status(200).send({ ubicacion }); //Devolvemos la ubicacion
    });
}


// Funcion para actualizar una ubicacion
function updateUbicacion(req, res) {
   
    var ubicacionId = req.params.id;
    var update = req.body;


    Ubicacion.find({ ubicacion: update.ubicacion}).exec((err, ubicaciones) => {

        var ubicacion_isset = false;

        ubicaciones.forEach((ubicacion) => {
            if (ubicacion && ubicacion._id != ubicacionId)
            ubicacion_isset = true;
        });

        if(ubicacion_isset)
            return res.status(404).send({ message: 'Los datos ya estan en uso' });

        // Si son iguales, buscamos y actualizamos ({new:true} devuelve la ubicacion actualizada, false el original)
        Ubicacion.findByIdAndUpdate(ubicacionId, update, { new: true, useFindAndModify: false }, (err, ubicacionUpdated) => {

            if (err)// Si hay error
                return res.status(500).send({ message: 'Error en la peticion' });
            if (!ubicacionUpdated)// Si no se ha podido actualizar la jornada
                return res.status(404).send({ message: 'No se ha podido actualizar la ubicacion' });

            return res.status(200).send({ message: ubicacionUpdated }); // Devolvemos la ubicacion
        });
    });
}

// Funcion para eliminar una ubicacion
function deleteUbicacion(req, res) {
    var ubicacionId = req.params.id; //ID de la ubicacion

    //Buscamos por ID
    Ubicacion.find({'_id': ubicacionId }).remove((err, ubicacionRemoved) => {
        //Error
        if (err) return res.status(500).send({ message: 'Error al intentar eliminar la ubicacion' });
        //No encontrada
        if (!ubicacionRemoved) return res.status(404).send({ message: 'La ubicacion no existe o ya ha sido eliminada' });
        //Exito
        return res.status(200).send({ message: 'La ubicacion ha sido eliminada' });
    });
}


module.exports = {
    saveUbicacion,
    getUbicaciones,
    getUbicacion,
    updateUbicacion,
    deleteUbicacion
}