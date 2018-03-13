'use strict'

var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user')

function pruebas(req, resp){
    resp.status(200).send({
        message: 'Prueba de funcion'
    })
}

function saveUser(req, res){
    var user = new User();

    var params = req.body;
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = params.image
    
    if(params.password){
       // encriptar contraseña y guardar
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            if(user.name!= null && user.email != null){
                // Guardar el usuario
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message: 'error al guardar el usuario'})
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'no se ha podido guardar el usuario'})
                        }else{
                            res.status(200).send({user: userStored})
                        }
                    }
                });
            }else{
                res.status(200).send({message: 'introduce todos los campos'})
            }
        })
    } else{
        res.status(200).send({message: 'introduce la contrasena'})
    }

}

module.exports = {
    pruebas,
    saveUser
}; 

