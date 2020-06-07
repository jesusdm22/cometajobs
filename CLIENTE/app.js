// Usamos las novedades de JS
'use strict'

// Cargamos librerias
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
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




app.use('/', express.static('cliente', {redirect:false}));

// Rutas
app.use('/api', rutas_usuario);
app.use('/api', rutas_oferta);
app.use('/api', rutas_jornada);
app.use('/api', rutas_ubicacion);
app.use('/api', rutas_inscripcion);
app.use('/api', rutas_busqueda);

app.get('*', function(req, res, next){
          res.sendFile(path.join(__dirname, 'cliente', 'index.html'));
});


// Exportar la app
module.exports = app;
