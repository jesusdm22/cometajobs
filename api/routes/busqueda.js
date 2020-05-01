'use strict'

var express = require('express');
var BusquedaController = require('../controllers/busqueda');
var api = express.Router();


api.post('/busqueda/:texto?/:ubicacion?/:jornada?', BusquedaController.buscar); //Buscar


module.exports = api;