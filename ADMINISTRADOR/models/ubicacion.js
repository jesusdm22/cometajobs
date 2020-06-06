'use strict'

//Basandonos en libreria mongoose
var mongoose = require('mongoose');
//Obtenemos el esquema
var Schema = mongoose.Schema;

//Definimos el esquema JSON 
var UbicacionSchema = Schema({
    ubicacion: String,
})

// Lo exportamos, dandole un nombre al modelo y pasandole el esquema creado
module.exports = mongoose.model('Ubicacione', UbicacionSchema);