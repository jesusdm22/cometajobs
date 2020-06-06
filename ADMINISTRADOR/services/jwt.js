//Servicio para generar tokens
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function(user){
    var payload = { //Datos del usuario
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //Fecha de creacion del token
        exp: moment().add(30, 'days').unix //Fecha de expiracion del token es la misma de creacion +30 dias

    };
    return jwt.encode(payload, secret); //Devolvemos el user encriptado con la clave secreta
};