'use strict'

//Basandonos en libreria mongoose
var mongoose = require('mongoose');
//Obtenemos el esquema
var Schema = mongoose.Schema;

var OfertaSchema = Schema ({
    titulo: String,
    descripcion: String,
    experiencia: String,
    sueldo: String,
    ubicacion: String,
    jornada: {type: Schema.ObjectId, ref: 'Jornada'},// Referencia a otro tipo de dato
    created_at: String,
    empresa: {type: Schema.ObjectId, ref: 'Usuario'}// Referencia a otro tipo de dato
});

// Lo exportamos, dandole un nombre al modelo y pasandole el esquema creado
module.exports = mongoose.model('Oferta', OfertaSchema);