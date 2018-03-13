'use strict'
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_route = require('./routes/user');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// configurar cabeceras http

// rutas base
app.use('/api', user_route);

module.exports = app;