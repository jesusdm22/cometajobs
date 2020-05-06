'use strict'

//Llamamos a express
var express = require('express');
//LLamamos al controlador
var UsuarioController = require('../controllers/usuario.js');

//Creamos el router
var api = express.Router();

//Cargamos el middleware de autenticacion
var md_auth = require('../middlewares/authenticated.js');

//Cargamos el middleware de subidas de archivos
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'}); //Ruta de subidas


//Asignamos los metodos del controlador a las URL y usamos middleware en las que lo requieran
api.post('/registrar', UsuarioController.saveUser); // Guardar un usuario (registro)
api.post('/login', UsuarioController.loginUser); // Login de un usuario (login)
api.get('/usuario/:id', md_auth.ensureAuth, UsuarioController.getUser); // Ver un usuario
api.get('/usuarios/:page?', md_auth.ensureAuth, UsuarioController.getUsers); // Ver usuarios
api.get('/empresas/:page?', md_auth.ensureAuth, UsuarioController.getEmpresas); // Ver empresas
api.delete('/usuario/:id', md_auth.ensureAuth, UsuarioController.deleteUser); // Eliminar usuario
api.put('/update-user/:id', md_auth.ensureAuth, UsuarioController.updateUser); // Actualizar datos de usuario
api.post('/update-image-user/:id', [md_auth.ensureAuth, md_upload], UsuarioController.uploadImage); //Aqui usaremos dos middlewares // Subir imagen de usuario
api.get('/get-image-user/:imageFile', UsuarioController.getImageFile); // Ver imagen de usuario
api.post('/sendMail', UsuarioController.sendMail); // Enviar Correo

//Exportamos
module.exports = api;