'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    _id: String,
    title: String,
    description: String,
    year: String,
    image: String,
    artist: {type: Schema.ObjectId, ref: 'Artist'},
});

module.exports = mongoose.model('Album', AlbumSchema);