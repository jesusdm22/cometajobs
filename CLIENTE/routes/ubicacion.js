'use strict'

//Cargamos dependencias
var express = require('express');
var UbicacionController = require('../controllers/ubicacion');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//Rutas
api.post('/ubicacion', md_auth.ensureAuth, UbicacionController.saveUbicacion); // Crear ubicacion
api.get('/ubicaciones/:page?', UbicacionController.getUbicaciones); // Obtener ubicaciones
api.get('/ubicacion/:id', md_auth.ensureAuth, UbicacionController.getUbicacion); // Obtener ubicacion en concreto
api.put('/update-ubicacion/:id', md_auth.ensureAuth, UbicacionController.updateUbicacion); // Editar ubicacion
api.delete('/ubicacion/:id', md_auth.ensureAuth, UbicacionController.deleteUbicacion); // Eliminar ubicacion

module.exports = api;