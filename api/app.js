// Usamos las novedades de JS
'use strict'

// Cargamos librerias
var express = require('express');
var bodyParser = require('body-parser');

// Instanciamos el framework (Express)
var app = express();

// Cargar rutas
var rutas_usuario = require('./routes/usuario.js');
var rutas_oferta = require('./routes/oferta.js');
var rutas_jornada = require('./routes/jornada.js');
var rutas_ubicacion = require('./routes/ubicacion.js');
var rutas_inscripcion = require('./routes/inscripcion.js');
var rutas_busqueda = require('./routes/busqueda.js');

// Middlewares (Metodo que se ejecuta antes de una peticion)
app.use(bodyParser.urlencoded({extended:false})); // Configuracion de bodyParser
app.use(bodyParser.json()); // La convertimos a JSON

/* Cors (configurar cabeceras http en front-end angular)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});*/


// Rutas
app.use('/api', rutas_usuario);
app.use('/api', rutas_oferta);
app.use('/api', rutas_jornada);
app.use('/api', rutas_ubicacion);
app.use('/api', rutas_inscripcion);
app.use('/api', rutas_busqueda);


// Exportar la app
module.exports = app;
