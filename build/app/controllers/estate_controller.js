'use strict';

const estateController = {
    create(data) {
        return {
            getAllEstates(req, res) {
                data.getEstates({}, 24)
                    .then(estates => res.status(200).json(estates))
                    .catch(error => {
                        res.status(500).json(error);
                    });
            },
            getEstateById(req, res) {
                data.findEstateById(req.params.id)
                    .then(estate => res.status(200).json(post))
                    .catch(error => {
                        res.status(500).json(error);
                    });
            },
            createEstate(req, res) {
                let estate = req.body;
                estate.owner = req.session.passport.user;

                data.createNewEstate(estate)
                    .then((dbEstate) => {
                        res.status(200).json(dbEstate);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            },
            removeEstate(req, res) {
                const estateId = req.params.id;
                data.removeEstate(estateId)
                    .then((dbEstate) => {
                        res.status(200).json(dbEstate);
                    })
                    .catch(error => {
                        res.status(500).json(error);
                    });
            }
        };
    }
};

module.exports = estateController;