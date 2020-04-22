'use strict'
// Libreria Para cifrar las contraseñas
var bcrypt = require('bcrypt-nodejs');
// Cargamos los modelos
var User = require('../models/usuario.js');
var Oferta = require('../models/oferta.js');
// Cargamos el servicio de tokens
var jwt = require('../services/jwt.js');
// Cargamos el mongoose pagination
var mongoosePagination = require('mongoose-pagination');
// Cargamos filesystem
var fs = require('fs');
// Cargamos path
var path = require('path');


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

async function followThisUser(identity_user_id, user_id) {
    var following = await Follow.findOne({ user: identity_user_id, followed: user_id }).exec()
        .then((following) => {
            return following;
        })
        .catch((err) => {
            return handleError(err);
        });
    var followed = await Follow.findOne({ user: user_id, followed: identity_user_id }).exec()
        .then((followed) => {
            return followed;
        })
        .catch((err) => {
            return handleError(err);
        });

    return {
        following: following,
        followed: followed
    };
}


// Funcion para devolver un listado de usuarios paginado
function getUsers(req, res) {
    var identity_user_id = req.user.sub; //Usuario logueado actualmente
    var page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    var itemsPerPage = 5; // Usuarios por pagina

    // Ordenamos por id y le decimos que pagine 
    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        if (err)
            res.status(500).send({ message: 'Error en la peticion' });
        if (!users)
            res.status(404).send({ message: 'No hay usuarios disponibles' });

        followUsersId(identity_user_id).then((value) => {

            return res.status(200).send({
                users,
                users_following: value.following,
                users_follows_me: value.followed,
                total,
                pages: Math.ceil(total / itemsPerPage) //Numero de paginas = total de usuarios / usuarios por pagina
            });
        });

    });
}

//Funcion sincrona 
async function followUsersId(user_id) {
    var following = await Follow.find({ user: user_id }).select({ _id: 0, __v: 0, user: 0 }).exec().then((follows) => {
        var follows_clean = [];
        follows.forEach((follow) => {
            follows_clean.push(follow.followed);
        });
        return follows_clean;
    }).catch((err) => {
        return handleError(err);
    });


    var followed = await Follow.find({ followed: user_id }).select({ _id: 0, __v: 0, followed: 0 }).exec().then((follows) => {
        var follows_clean = [];

        follows.forEach((follow) => {
            follows_clean.push(follow.user);
        });

        return follows_clean;

    }).catch((err) => {
        return handleError(err);
    });


    return {
        following: following,
        followed: followed
    };
}

//Contadores
const getCounters = (req, res) => {
    let userId = req.user.sub;
    if (req.params.id) {
        userId = req.params.id;
    }
    getCountFollow(userId).then((value) => {
        return res.status(200).send(value);
    })
}

const getCountFollow = async (user_id) => {
    try {
        // Lo hice de dos formas. "following" con callback de countDocuments y "followed" con una promesa
        let following = await Follow.countDocuments({ "user": user_id }, (err, result) => { return result });
        let followed = await Follow.countDocuments({ "followed": user_id }).then(count => count);
        let Ofertas = await Oferta.countDocuments({ 'user': user_id }).then(count => count);
        return { following, followed, Ofertas }

    } catch (e) {
        console.log(e);
    }
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
    delete update.password;

    // Si el id del usuario es diferente al del token (es pq otro usuario esta intentado editarnos nuestros datos)
    if (userId != req.user.sub)
        return res.status(500).send({ message: 'No tienes permiso para actualizar los datos del usuario' });


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

        var file_split = file_path.split('\\'); // Spliteamos la ruta por barra
        var file_name = file_split[2]; // El nombre se encuentra en la posicion 2 del array
        console.log(file_name);

        var extension = file_name.split('.')[1]; // La extension se encuentra en la posicion 1 del array del nombre spliteado por .
        console.log(extension);

        // Si el id del usuario es diferente al del token (es pq otro usuario esta intentado editarnos nuestros datos)
        if (userId != req.user.sub) {
            return removeFileOfUploads(res, file_path, 'No tienes permiso para actualizar los datos del usuario');
        }

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

// Exportamos 
module.exports = {
    saveUser,
    loginUser,
    getUser,
    getUsers,
    getCounters,
    deleteUser, 
    updateUser,
    uploadImage,
    getImageFile
}