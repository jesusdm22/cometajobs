'use strict'

//Basandonos en libreria mongoose
var mongoose = require('mongoose');
//Obtenemos el esquema
var Schema = mongoose.Schema;

//Definimos el esquema JSON del modelo
var InscripcionSchema = Schema({
    usuario: {type: Schema.ObjectId, ref: 'Usuario'},
    oferta: {type: Schema.ObjectId, ref: 'Oferta'}
})

// Lo exportamos, dandole un nombre al modelo y pasandole el esquema creado
module.exports = mongoose.model('Inscripcione', InscripcionSchema);