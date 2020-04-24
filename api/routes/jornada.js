'use strict'

//Cargamos dependencias
var express = require('express');
var JornadaController = require('../controllers/jornada');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//Rutas
api.post('/jornada', md_auth.ensureAuth, JornadaController.saveJornada); // Crear jornada
api.get('/jornadas/:page?', JornadaController.getJornadas); // Obtener jornadas
api.get('/jornada/:id', md_auth.ensureAuth, JornadaController.getJornada); // Obtener jornada en concreto
api.put('/jornada/:id', md_auth.ensureAuth, JornadaController.updateJornada); // Editar jornada
api.delete('/jornada/:id', md_auth.ensureAuth, JornadaController.deleteJornada); // Eliminar jornada

module.exports = api;