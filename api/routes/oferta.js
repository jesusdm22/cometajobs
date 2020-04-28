'use strict'

//Cargamos dependencias
var express = require('express');
var OfertaController = require('../controllers/oferta');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/publications'});

//Rutas
api.post('/oferta', md_auth.ensureAuth, OfertaController.saveOferta); // Crear oferta
api.get('/ofertas/:page?', OfertaController.getOfertas); // Obtener ofertas
api.get('/oferta/:id', md_auth.ensureAuth, OfertaController.getOferta); // Obtener oferta en concreto
api.get('/ofertas-user/:user/:page?', md_auth.ensureAuth, OfertaController.getOfertasByUser); // Obtener oferta de un usuario(empresa)
api.get('/misOfertas/:id?', md_auth.ensureAuth, OfertaController.getMisOfertas); //Obtener las ofertas del usuario actual
api.put('/update-oferta/:id', md_auth.ensureAuth, OfertaController.updateOferta); // Editar oferta
api.delete('/oferta/:id', md_auth.ensureAuth, OfertaController.deleteOferta); // Eliminar publicacion

module.exports = api;