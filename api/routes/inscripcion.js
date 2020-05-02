'use strict'

var express = require('express');
var InscripcionController = require('../controllers/inscripcion');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.post('/inscripcion', md_auth.ensureAuth, InscripcionController.saveInscripcion); //Crear inscripcion
api.get('/inscripciones', md_auth.ensureAuth, InscripcionController.getInscripciones); //Obtener todas las inscripciones
api.get('/inscripcion/:id', md_auth.ensureAuth, InscripcionController.getInscripcion); //Obtener una inscripcion en concreto
api.get('/inscritos/:id', md_auth.ensureAuth, InscripcionController.getInscritos); //Obtener las inscripciones del una oferta
api.get('/misInscripciones/', md_auth.ensureAuth, InscripcionController.getMisInscripciones); //Obtener las inscripciones del usuario actual
api.delete('/inscripcion/:id', md_auth.ensureAuth, InscripcionController.deleteInscripcion); //Eliminar inscripcion pasandole id


module.exports = api;