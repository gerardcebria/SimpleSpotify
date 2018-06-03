'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated')

var api = express.Router();

var multipart = require('connect-multiparty');
var md_uploads = multipart({uploadDir: './uploads/users'});

api.get('/prueba', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.put('/upload-image/:id', [md_auth.ensureAuth, md_uploads], UserController.uploadImage);
api.get('/get-image/:imageFile', UserController.getImageFile);

module.exports = api;