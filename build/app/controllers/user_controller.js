'use strict';

const userController = {
    create(data, passport) {
        return {
            getAll(req, res) {
                data.getUsers({}, 20)
                    .then(users => res.status(200).json(users))
                    .catch(error => {
                        res.status(500).json(error);
                    });
            },
            getById(req, res) {
                const id = req.params.id;
                data.findById(id)
                    .then(user => res.status(200).json(user))
                    .catch(error => {
                        res.status(500).json(error);
                    });
            },
            getByUsername(req, res) {
                data.findByUsername(req.params.username)
                    .then(user => res.status(200).json(user))
                    .catch(error => {
                        res.status(500).json(error);
                    });
            },
            loginLocal(req, res, next) {
                const auth = passport.authenticate('local', function(error, user) {
                    if (error) {
                        next(error);
                        return;
                    }

                    if (!user) {
                        res.status(400).json({
                            success: false,
                            message: 'Invalid name or password!'
                        });
                    }

                    req.login(user, error => {
                        if (error) {
                            next(error);
                            return;
                        }
                        res.status(200).json({
                            id: req.session.passport.user,
                            success: true,
                            message: 'Login successful!'
                        });
                    });
                });

                auth(req, res, next);
            },
            logout(req, res) {
                req.logout();
                res.status(200).json({
                    success: true
                });
            },
            register(req, res) {
                const user = req.body;
                data.createUser(user)
                    .then(dbUser => {
                        res.status(201).json({ message: 'User created successfully!' });
                    })
                    .catch(error => res.status(500).json(error));
            },
            promote(req, res) {
                const id = req.body.id,
                    role = req.body.role;
                data.promoteUser(id, role)
                    .then(dbUser => {
                        res.status(201).json({ message: `User ${dbUser.username} promoted to role ${dbUser.role}!` });
                    })
                    .catch(error => res.status(500).json(error));
            }
        };
    }
};

module.exports = userController;