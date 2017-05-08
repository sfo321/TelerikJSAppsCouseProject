'use strict';

const data = require('../data');

module.exports = {
    pasteById(req, res, next) {
        data.pasteById(req.params.pasteId)
            .then(paste => {
                if (!paste) {
                    res.status(404).json({ message: 'No paste with such id!' });
                    return;
                }

                req.data = req.data || {};
                req.data.paste = paste;
                next();
            })
            .catch(error => res.status(500).json({ message: 'It broke!(again)' }));
    },
    isAuthor(req, res, next) {
        data.findPostById(req.params.id)
            .then(post => {

                if (!post) {
                    res.status(404).json({ message: 'No post with such id!' });
                    return;
                }

                if (req.user && req.user._id.toString() === post.author._id.toString()) {
                    next();

                } else {
                    res.status(401).json({
                        success: false,
                        message: 'Not authorized!'
                    });
                }
            })
            .catch(error => res.status(500).json({ message: 'It broke!(again)' }));
    }
};