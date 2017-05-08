'use strict';

const imagesController = {
    create(data) {
        return {
            getAll(req, res) {
                data.getImages({}, 20)
                    .then(images => res.status(200).json(images))
                    .catch(error => {
                        res.status(500).json(error);
                    });
            },
            getById(req, res) {
                data.findImageById(req.params.id)
                    .then(image => res.status(200).json(image))
                    .catch(error => {
                        res.status(500).json(error);
                    });
            },
            getByTitle(req, res) {
                data.findImageByTitle(req.params.title)
                    .then(image => res.status(200).json(image))
                    .catch(error => {
                        res.status(500).json(error);
                    });
            },
            create(req, res) {
                let image = req.body;
                data.createImage(image)
                    .then(image => {
                        res.status(201).json({ message: 'Image added successfully!' });
                    })
                    .catch(error => res.status(500).json(error));
            }
        };
    }
};

module.exports = imagesController;