'use strict'

var bcrypt = require('bcrypt-nodejs');
var Album = require('../models/album');
var jwt = require('../services/jwt');

function pruebas(req, resp){
    resp.status(200).send({
        message: 'Probando una acción del controlador de albums del api resto con Node y MongoDB'
    })
}


module.exports = {
   pruebas 
}; 
