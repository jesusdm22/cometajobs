'use strict'

//Basandonos en libreria mongoose
var mongoose = require('mongoose');
//Obtenemos el esquema
var Schema = mongoose.Schema;

//Definimos el esquema JSON del usuario
var UsuarioSchema = Schema({
    nombre: String,
    login: String,
    password: String,
    movil: String,
    email: String,
    acceso: String,
    imagen: String
})

// Lo exportamos, dandole un nombre al modelo y pasandole el esquema creado
module.exports = mongoose.model('Usuario', UsuarioSchema);