'use strict'

// Librerias
var mongoosePagination = require('mongoose-pagination');

//Modelos
var Jornada = require('../models/jornada.js');



//Crear jornada
function saveJornada(req, res) {

    var params = req.body; // Recogemos los datos desde post 
    if (!params.jornada)
        return res.status(200).send({ message: 'Debes enviar un titulo para la jornada' });

    // Seteamos la publicacion con los datos que llegaron por post
    var jornada = new Jornada();
    jornada.jornada = params.jornada;
    jornada.color = params.color;


    jornada.save((err, jornadaStored) => {

        if (err)
            return res.status(500).send({ message: 'Error al guardar la jornada' });

        if (!jornadaStored)
            return res.status(404).send({ message: 'La jornada no se ha guardado' });

        return res.status(200).send({ oferta: jornadaStored });
    });

}

//Funcion para obtener todas las jornadas
function getJornadas(req, res) {
    var page = 1;

    if (req.params.page)
        page = req.params.page;



        Jornada.find().exec((err, jornadas, total) => {
                if (err)
                    return res.status(500).send({ message: 'Error al devolver las jornadas' });
                if (!jornadas)
                    return res.status(404).send({ message: 'No hay jornadas' });

                return res.status(200).send({
                    jornadas

                });
            });
}


// Funcion para obtener una jornada en concreto 
function getJornada(req, res) {

    
    var jornadaId = req.params.id; //Obtenemos el id de la jornada por la url
    Jornada.findById(jornadaId, (err, jornada) => { // La buscamos en la base de datos
      
        if (err)// Error en server
            return res.status(500).send({ message: 'Error al devolver publicaciones' });

        if (!jornada) //No encontrado
            return res.status(404).send({ message: 'La publicacion no existe' });

       
        return res.status(200).send({ jornada }); //Devolvemos la jornada
    });
}


// Funcion para actualizar datos de una jornada
function updateJornada(req, res) {
   
    var jornadaId = req.params.id;
    var update = req.body;

    Jornada.find({
        $or: [
            { jornada: update.jornada },
            { color: update.color }
        ]
    }).exec((err, jornadas) => {
        var jornada_isset = false;

        jornadas.forEach((jornada) => {
            if (jornada && jornada._id != jornadaId)
                jornada_isset = true;
        });

        if(jornada_isset)
            return res.status(404).send({ message: 'Los datos ya estan en uso' });

        // Si son iguales, buscamos y actualizamos ({new:true} devuelve la jornada actualizada, false el original)
        Jornada.findByIdAndUpdate(jornadaId, update, { new: true, useFindAndModify: false }, (err, jornadaUpdated) => {

            if (err)// Si hay error
                return res.status(500).send({ message: 'Error en la peticion' });
            if (!jornadaUpdated)// Si no se ha podido actualizar la jornada
                return res.status(404).send({ message: 'No se ha podido actualizar la jornada' });

            return res.status(200).send({ message: jornadaUpdated }); // Devolvemos la jornada
        });
    });
}


// Funcion para eliminar una jornada
function deleteJornada(req, res) {
    var jornadaId = req.params.id; //ID de la jornada

    //Buscamos por ID
    Jornada.find({'_id': jornadaId }).remove((err, jornadaRemoved) => {
        //Error
        if (err) return res.status(500).send({ message: 'Error al intentar eliminar la jornada' });
        //No encontrada
        if (!jornadaRemoved) return res.status(404).send({ message: 'La jornada no existe o ya ha sido eliminada' });
        //Exito
        return res.status(200).send({ message: 'La jornada ha sido eliminada' });
    });
}



module.exports = {
    saveJornada,
    getJornadas,
    getJornada,
    updateJornada,
    deleteJornada
}
