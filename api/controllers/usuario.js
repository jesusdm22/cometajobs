'use strict'
// Libreria Para cifrar las contraseñas
var bcrypt = require('bcrypt-nodejs');
// Cargamos los modelos
var User = require('../models/usuario.js');
var Oferta = require('../models/oferta.js');
// Cargamos el servicio de tokens
var jwt = require('../services/jwt.js');
var moment = require('moment');
// Cargamos el mongoose pagination
var mongoosePagination = require('mongoose-pagination');
// Cargamos filesystem
var fs = require('fs');
// Cargamos path
var path = require('path');

//Sendgrid
const sgMail = require('@sendgrid/mail');


// Funcion para guardar usuarios
function saveUser(req, res) {
    var params = req.body; // Aqui todos los campos que lleguen por post

    //Instanciamos un usuario
    var user = new User();

    // Si nos llegan todos los datos
    if (params.nombre && params.login && params.movil &&
        params.email && params.password) {

        // Asignamos esos datos a un usuario
        user.nombre = params.nombre;
        user.login = params.login;
        user.movil = params.movil;
        user.email = params.email;
        user.biografia = params.biografia;
        user.created_at = moment().unix();

        if(!params.acceso) //Si no nos llega tipo de perfil, por defecto sera un candidato (3)
            user.acceso = '3';
        else 
            user.acceso = params.acceso;

        user.imagen = null;

        // Controlar usuarios duplicados
        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { login: user.login.toLowerCase() }
            ]
        }).exec((err, users) => {
            if (err)
                return res.status(500).send({ message: 'Error en la peticion' });
            if (users && users.length >= 1)
                return res.status(200).send({ message: 'El usuario que intentas registrar ya existe' });
            else {
                // Encriptamos contraseña y guardamos los datos
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                    // Guardamos en la bd
                    user.save((err, userStored) => {
                        if (err)
                            return res.status(500).send('Error al guardar el usuario');
                        if (userStored)
                            res.status(200).send({ user: userStored })
                        else
                            res.status(404).send({ message: 'No se ha registrado el usuario' });
                    });
                });
            }
        });

    } else { // Si no..mensaje de error
        res.status(200).send({
            message: 'Envia todos los campos necesarios'
        })
    }
}

// Funcion para loguear un usuario
function loginUser(req, res) {
    // Recogemos los datos que nos llegan por post
    var params = req.body;

    var login = params.login;
    var password = params.password;
    var title = params.title;

    User.findOne({ login: login }, (err, user) => {

        if (err)
            return res.status(500).send({ message: 'Error en la peticion' });

        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        // generar y devolver token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    } else {
                        // devolver user
                        user.password = undefined; // Para eliminar la propiedad y no mostrar la contraseña
                        return res.status(200).send({ user });
                    }

                } else {
                    return res.status(404).send({ message: 'El usuario no se puede identificar' });
                }
            });
        } else {
            return res.status(404).send({ message: 'El usuario no se puede identificar!!' })
        }
    });
}

function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (!user) return res.status(404).send({ message: "Usuario no encontrado" });
        if (err) return res.status(500).send({ message: "Error en la peticion" });

        return res.status(200).send({user});
        
    });
}




// Funcion para devolver un listado de usuarios paginado
function getUsers(req, res) {
    //var identity_user_id = req.user.sub; //Usuario logueado actualmente
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }


    // Ordenamos por id 
    User.find().sort('_id').exec((err, users) => {
        if (err)
            res.status(500).send({ message: 'Error en la peticion' });
        if (!users)
            res.status(404).send({ message: 'No hay usuarios disponibles' });

        return res.status(200).send({
                users
               
         
        });

    });
}


// Funcion para devolver un listado de usuarios paginado
function getEmpresas(req, res) {

    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    var itemsPerPage = 5; // Usuarios por pagina

    // Ordenamos por id y le decimos que pagine 
    User.find({acceso: '2'}).sort('_id').paginate(page, itemsPerPage, (err, empresas, total) => {
        if (err)
            res.status(500).send({ message: 'Error en la peticion' });
        if (!empresas)
            res.status(404).send({ message: 'No hay empresas disponibles' });

        return res.status(200).send({
                empresas,
                total,
                pages: Math.ceil(total / itemsPerPage) //Numero de paginas = total de usuarios / usuarios por pagina
         
        });

    });
}



// Funcion para eliminar un usuario
function deleteUser(req, res) {

    var userId = req.params.id;

    User.find({'_id': userId }).remove((err, usuarioEliminado) => {
        if (err) return res.status(500).send({ message: 'Error al intentar eliminar el usuario' });

        if (!usuarioEliminado) return res.status(404).send({ message: 'El usuario no existe o ya ha sido eliminado' });

        return res.status(200).send({ message: 'El usuario ha sido eliminado' });
    });
}



// Funcion para actualizar datos de un usuario
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    // borrar propiedad password
    //delete update.password;

    if(update.password.length < 40)    
    	update.password = bcrypt.hashSync(update.password);
   

    User.find({
        $or: [
            { email: update.email },
            { login: update.login }
        ]
    }).exec((err, users) => {
        var user_isset = false;

        users.forEach((user) => {
            if (user && user._id != userId)
                user_isset = true;
        });

        if(user_isset)
            return res.status(404).send({ message: 'Los datos ya estan en uso' });

        // Si son iguales, buscamos y actualizamos ({new:true} devuelve el usuario actualizado, false el original)
        User.findByIdAndUpdate(userId, update, { new: true, useFindAndModify: false }, (err, userUpdated) => {

            if (err)// Si hay error
                return res.status(500).send({ message: 'Error en la peticion' });
            if (!userUpdated)// Si no se ha podido actualizar el usuario
                return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });

            return res.status(200).send({ message: userUpdated }); // Devolvemos el usuario
        });
    });

}


// Subir archivos de imagen 
function uploadImage(req, res) {
    var userId = req.params.id;

    if (req.files) { // Si estamos intentando subir un fichero

        var file_path = req.files.image.path; // Ruta de imagen
        console.log(file_path);

        var file_split = file_path.split('/'); // Spliteamos la ruta por barra
        var file_name = file_split[2]; // El nombre se encuentra en la posicion 2 del array
        console.log(file_name);

        var extension = file_name.split('.')[1]; // La extension se encuentra en la posicion 1 del array del nombre spliteado por .
        console.log(extension);


        // Comprobamos extensiones
        if (extension == 'png' || extension == 'jpg' || extension == 'jpeg' || extension == 'gif') {
            //Actualizamos el documento del usuario logueado y le ponemos la foto
            User.findByIdAndUpdate(userId, { imagen: file_name }, { new: true }, (err, userUpdated) => {
                if (err)// Si hay error
                    return res.status(500).send({ message: 'Error en la peticion' });

                if (!userUpdated)// Si no se ha podido actualizar el usuario
                    return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });

                return res.status(200).send({ message: userUpdated }); // Devolvemos el usuario actualizado
            })


        } else {
            return removeFileOfUploads(res, file_path, 'Extension no valida');
        }
    } else {

        return res.status(200).send({ message: 'No se han subido imagenes' });
    }

}

function removeFileOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message });
    });
}


// Funcion para volver imagen del usuario
function getImageFile(req, res) {
    var image_file = req.params.imageFile; //Obtenemos por la url la imagen
    var path_file = './uploads/users/' + image_file; // Le concatenamos la ruta

    fs.exists(path_file, (exists) => {
        if (exists) {// Si existe devolvemos la imagen
            res.sendFile(path.resolve(path_file));
        }
        else { // Si no, error
            res.status(200).send({ message: 'No existe la image' });
        }
    });
}

var nodemailer = require('nodemailer'); 
function sendMail(req, res){
   
    var nombreCompleto = req.body.nombre + ' ' +  req.body.apellidos;
    var asunto = req.body.asunto;
    var mensaje = req.body.mensaje;
    


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jesusdiaz221020@gmail.com',
            pass: 'Jdm.2210'
            }
          });
          
          var mailOptions = {
            from: 'jesusdiaz221020@gmail.com',
            to: 'jesusdiaz221020@gmail.com',
            subject: asunto,
            text: nombreCompleto + mensaje
          };
          

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.status(500).send(error);
            } else {
                return res.status(200).send(info.response);
            }
        });
    
}



// Exportamos 
module.exports = {
    saveUser,
    loginUser,
    getUser,
    getUsers,
    getEmpresas,
    deleteUser, 
    updateUser,
    uploadImage,
    getImageFile,
    sendMail
}
