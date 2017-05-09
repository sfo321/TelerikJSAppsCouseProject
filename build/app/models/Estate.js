'use strict';

const mongoose = require('mongoose'),
    Image = require('./Image'),
    User = require('./User');

const estateSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    info: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    isDeleted: {
        type: Boolean,
        required: true
    }
});

const Estate = module.exports = mongoose.model('Estate', estateSchema);