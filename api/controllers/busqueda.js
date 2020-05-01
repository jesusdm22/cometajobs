'use strict'

// Librerias
var mongoosePagination = require('mongoose-pagination');

//Modelos
var Oferta = require('../models/oferta.js');
var Ubicacion = require('../models/ubicacion.js');
var Jornada = require('../models/jornada.js');


function buscar(req, res){
    var texto = req.body.texto;
    var ubicacionId = req.body.ubicacion;
    var jornadaId = req.body.jornada;

    var hayTexto = false;
    var hayUbicacion = false;
    var hayJornada = false;

    //Si solo recibimos el texto
    if(texto){
        hayTexto = true;
    }

    //Si solo recibimos la ubicacion
    if(ubicacionId){
        hayUbicacion= true;
    }
    
    //Si solo recibimos la jornada
    if(jornadaId){
        hayJornada = true
    }
       


    /* Oferta.find({titulo: { "$regex": texto, "$options": "i" }, ubicacionId: { "$regex": texto, "$options": "i" }}, (err, resultado) => {
        
        if (err)
            return res.status(500).send({ message: 'Error en la peticion' });

        if (!resultado)
            return res.status(404).send({ message: 'Su busqueda no obtuvo resultados' });
        else 
            return res.status(200).send({resultado});
    });
 */
    //return res.status(200).send({texto, ubicacionId, jornadaId});
}


module.exports = {
    buscar
}