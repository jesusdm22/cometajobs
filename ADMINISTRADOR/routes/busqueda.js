'use strict'

var express = require('express');
var BusquedaController = require('../controllers/busqueda');
var api = express.Router();


api.post('/busqueda', BusquedaController.buscar); //Buscar


module.exports = api;