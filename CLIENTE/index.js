'use strict'

//Libreria de mongo
var mongoose = require('mongoose');

// Cargamos la app
var app = require('./app');
// Configuramos el puerto
var port = 3900;

//Creamos una promesa, con una conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cometajobs', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('La conexion a la DB se ha realizado con exito!!');
        // Si hay conexion, creamos el servidor
        app.listen(port, () => {
            console.log('CLIENTE corriendo en http://localhost:3900');
        });
    
}).catch(err => console.log(err));


