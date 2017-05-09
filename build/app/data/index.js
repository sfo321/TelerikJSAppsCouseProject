'use strict';

const User = require('../models/User'),
    Image = require('../models/Image'),
    Estate = require('../models/Estate'),
    mongoose = require('mongoose'),
    hashing = require('../utils/hashing');

mongoose.connect('mongodb://localhost/estates');
mongoose.Promise = global.Promise;

module.exports = {

    //users data

    getUsers(cb, limit) {
        return User.find(cb).limit(+limit);
    },
    findById(id) {
        return User.findById(id);
    },
    findByUsername(username) {
        return User.findOne({ username });
    },
    createUser(user) {
        const salt = hashing.generateSalt(),
            passHash = hashing.hashPassword(salt, user.password);

        const newUser = {
            username: user.username,
            fullName: user.firstName + ' ' + user.lastName,
            email: user.email,
            phone: user.phoneNumber,
            role: 'default',
            passHash,
            salt
        };

        return User.create(newUser);
    },
    promoteUser(userId, role) {
        return User.findByIdAndUpdate(userId, {
            $set: { role: role }
        });
    },

    //images data

    getImages(cb, limit) {
        return Image.find(cb).limit(+limit);
    },
    findByTitle(title) {
        return Image.findOne({ title });
    },
    createImage(image) {
        const newImage = {
            imageUrl: image.imageUrl,
            title: image.title,
            isDeleted: false
        };

        return Image.create(newImage);
    },

    //estates data

    createNewEstate(estate) {
        const newEstate = {
            type: estate.type,
            owner: estate.owner,
            info: estate.info,
            price: estate.price,
            location: estate.location,
            imageUrl: estate.image,
            images: estate.images || [],
            isDeleted: false
        };
        return Estate.create(newEstate);
    },

    removeEstate(estateId) {
        return Estate.findByIdAndUpdate(estateId, {
            $set: { isDeleted: true }
        });
    },
    getEstates(cb, limit) {
        return Estate.find(cb).limit(+limit);
    },
    findEstateById(id) {
        return Estate.findById(id);
    },

    getPagedPastes(pageNumber, pageSize, options) {

        const { widthDeleted, withDetails } = options;

        const query = Paste.find(withDeleted ? {} : { deletedAt: undefined })
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        return detailed ? query : query.select('content lang');

    },
    // pasteById(id) {
    //     return Paste.findById(id);
    // },
    // updatePasteById(id, updateOptions) {
    //     return Paste.findByIdAndUpdate(id, updateOptions);
    // },
    // removePasteById(id) {
    //     return Paste.findByIdAndUpdate(id, {
    //         deletedAt: new Date()
    //     });
    // },
    // createCommentForPaste(pasteId, comment, author) {

    //     const newComment = {
    //         content: comment.content
    //     };

    //     if (author) {
    //         newComment.author = {
    //             username: author.username
    //         };
    //     }

    //     return Paste.findByIdAndUpdate(pasteId, {
    //         $push: { comments: newComment }
    //     });
    //}
};