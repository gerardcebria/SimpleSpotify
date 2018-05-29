'use strict'

var bcrypt = require('bcrypt-nodejs');
var Song = require('../models/song');
var jwt = require('../services/jwt');

function pruebas(req, resp){
    resp.status(200).send({
        message: 'Probando una acción del controlador de canciones del api resto con Node y MongoDB'
    })
}


module.exports = {
   pruebas 
}; 

