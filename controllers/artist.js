'use strict'

var bcrypt = require('bcrypt-nodejs');
var Artist = require('../models/artist');
var jwt = require('../services/jwt');

function pruebas(req, resp){
    resp.status(200).send({
        message: 'Probando una acción del controlador de artistas del api resto con Node y MongoDB'
    })
}


module.exports = {
   pruebas 
}; 
