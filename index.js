'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3997;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/simplify',
    (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('Conexión establecida con MongoDB');
            app.listen(port, function(){
                console.log("Servidor de API Rest escuchando en puerto: "+ port);
            })
        }
    });
