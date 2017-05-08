'use strict';

const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 6,
        maxlength: 25,
        required: true,
        unique: true
    },
    passHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 7,
        maxlength: 25,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        minlength: 8,
        maxlength: 16,
        required: true
    },
    role: {
        type: String,
        minlength: 4,
        maxlength: 8,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);