'use strict'

// Librerias
var mongoosePagination = require('mongoose-pagination');

//Modelos
var Oferta = require('../models/oferta.js');
var Ubicacion = require('../models/ubicacion.js');
var Jornada = require('../models/jornada.js');

//----------MOTOR DE BUSQUEDA----------
//ESTA FUNCION ES LA ENCARGADA DE REALIZAR LAS CONSULTAS DE LOS CRITERIOS DEL USUARIO EN LA DB
function buscar(req, res){
    var texto = req.body.titulo;
    var ubicacion = req.body.ubicacion;
    var jornadaId = req.body.jornada;

    //La busqueda se realizara tanto en el titulo como en la descripcion de la oferta.
    //Tambien seran criterios de filtrado la ubicacion y la jornada laboral.

    //Si solo recibimos el texto -----------------------------------------------------------------
    if(texto && !ubicacion && !jornadaId){
        //Query mostrando solo las ofertas que tengan el titulo escrito
        Oferta.find({ $or: [{titulo: { "$regex": texto, "$options": "i" }}, {descripcion: { "$regex": texto, "$options": "i" }}] }).populate('empresa jornada').exec( (err, resultado) => {
        
            if (err)
                return res.status(500).send({ message: 'Error en la peticion' });
    
            if (!resultado)
                return res.status(404).send({ message: 'Su busqueda no obtuvo resultados' });
            
            return res.status(200).send({resultado});
        });
     
    }

    //Si solo recibimos la ubicacion -----------------------------------------------------------------
    if(ubicacion && !texto && !jornadaId){
         //Query mostrando solo las ofertas que tengan esa ubicacion
        Oferta.find({ubicacion: { "$regex": ubicacion, "$options": "i" }}).populate('empresa jornada').exec((err, resultado) => {
        
            if (err)
                return res.status(500).send({ message: 'Error en la peticion' });
    
            if (!resultado)
                return res.status(404).send({ message: 'Su busqueda no obtuvo resultados' });
            
            return res.status(200).send({resultado});
        });
    }

    //Si solo recibimos la jornada -----------------------------------------------------------------
    if(jornadaId && !texto && !ubicacion) {
        //Query mostrando solo las ofertas que tengan esa jornada
        Oferta.find({'jornada' : jornadaId}).populate('empresa jornada').exec((err, resultado) => {
        
            if (err)
                return res.status(500).send({ message: 'Error en la peticion' });
    
            if (!resultado)
                return res.status(404).send({ message: 'Su busqueda no obtuvo resultados' });
            
            return res.status(200).send({resultado});
        });
    }


    //Recibimos texto y ubicacion -----------------------------------------------------------------
    if(texto && ubicacion && !jornadaId) {
        
           Oferta.find({
            $and: [
              {
                $or: [{titulo: { "$regex": texto, "$options": "i" }}, {descripcion: { "$regex": texto, "$options": "i" }}] 
              },
              {
                ubicacion: ubicacion
              }
            ]
          }).populate('empresa jornada').exec( (err, resultado) => {
           
               if (err)
                   return res.status(500).send({ message: 'Error en la peticion' });
       
               if (!resultado)
                   return res.status(404).send({ message: 'Su busqueda no obtuvo resultados' });
               
               return res.status(200).send({resultado});
           });
       }
    

     //Recibimos texto y jornada -----------------------------------------------------------------
    if(texto && !ubicacion && jornadaId) {
        
        Oferta.find({
         $and: [
           {
            $or: [{titulo: { "$regex": texto, "$options": "i" }}, {descripcion: { "$regex": texto, "$options": "i" }}] 
           },
           {
             'jornada': jornadaId
           }
         ]
       }).populate('empresa jornada').exec( (err, resultado) => {
        
            if (err)
                return res.status(500).send({ message: 'Error en la peticion' });
    
            if (!resultado)
                return res.status(404).send({ message: 'Su busqueda no obtuvo resultados' });
            
            return res.status(200).send({resultado});
        });
    }

    //Recibimos ubicacion y jornada -----------------------------------------------------------------
    if(!texto && ubicacion && jornadaId) {
        
        Oferta.find({
         $and: [
           {
            ubicacion: ubicacion
           },
           {
             'jornada': jornadaId
           }
         ]
       }).populate('empresa jornada').exec( (err, resultado) => {
        
            if (err)
                return res.status(500).send({ message: 'Error en la peticion' });
    
            if (!resultado)
                return res.status(404).send({ message: 'Su busqueda no obtuvo resultados' });
            
            return res.status(200).send({resultado});
        });
    }


    //Recibimos texto, ubicacion y jornada -----------------------------------------------------------------
    if(texto && ubicacion && jornadaId) {
        
        Oferta.find({
         $and: [
           {
             $or: [{titulo: { "$regex": texto, "$options": "i" }}, {descripcion: { "$regex": texto, "$options": "i" }}] 
           },
           {
            ubicacion: ubicacion
           },
           {
             'jornada': jornadaId
           }
         ]
       }).populate('empresa jornada').exec((err, resultado) => {
        
            if (err)
                return res.status(500).send({ message: 'Error en la peticion' });
    
            if (!resultado)
                return res.status(404).send({ message: 'Su busqueda no obtuvo resultados' });
            
            return res.status(200).send({resultado});
        });
    }

    //SI NO RECIBIMOS NADA, DEVOLVEMOS TODAS LAS OFERTAS -----------------------------------------------------------------
    if(!texto && !ubicacion && !jornadaId) {
        
        Oferta.find().populate('empresa jornada').exec((err, resultado) => {
        
            if (err)
                return res.status(500).send({ message: 'Error en la peticion' });
    
            if (!resultado)
                return res.status(404).send({ message: 'Su busqueda no obtuvo resultados' });
            
            return res.status(200).send({resultado});
        });
    }


}
module.exports = {
    buscar
}