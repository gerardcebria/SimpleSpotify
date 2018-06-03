'use strict'

var fileSystem = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, resp){
    resp.status(200).send({
        message: 'Probando una acción del controlador de usuarios del api resto con Node y MongoDB'
    })
}

function saveUser(req, res){
    var user = new User();

    var params = req.body;
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = params.image;
    
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
                            res.status(200).send({user: userStored});
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

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message :'error en la petición'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'})
            }else{
                //Comprueba la contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        //devolver los datos del user logeado
                        if(params.gethash){
                            //devolver un token jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no pudo loguearse'})
                    }
                });
            }
        }
    
    })
}

function updateUser(req, res){
    var userId = req.params.id; 
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No subido...';
    if(req.files){
       var file_path = req.files.image.path;
       var file_split = file_path.split('\\');
       var file_name = file_split[2];
       
       var ext_split = file_name.split('\.');
       var file_ext = ext_split[1];
       
       if(file_ext == 'png' || file_ext == 'jpg'|| file_ext == 'gif'){

            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated)=>{
                if(!userUpdated){
                    res.status(400).send('No se ha podido subir la foto');
                }else{
                    res.status(200).send({user: userUpdated});
                }
            });

       }else{
           res.status(200).send({message: 'Extensión del archivo no valida'})
       }
       
    }else{
        res.status(200).send({message: "No has subido ninguna imagen..."});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/users/' + imageFile;

    fileSystem.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: "No existe la imagen..."});   
        }
    });

}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}; 

