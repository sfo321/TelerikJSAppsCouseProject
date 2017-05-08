const Router = require("express").Router,
    auth = require('../middleware/auth-middleware'),
    passport = require('passport'),
    userController = require('../controllers/user_controller'),
    dataMiddleware = require('../middleware/data-middleware');

module.exports = (data) => {
    const router = new Router();
    const controller = userController.create(data, passport);

    router.get("/all",
            //auth.isInRole('admin'),
            //auth.isAuthenticated,
            controller.getAll)
        .get("/:id",
            //auth.isAuthenticated,
            controller.getById)
        .get("/:username",
            auth.isAuthenticated,
            controller.getByUsername)
        .post("/",
            controller.register)
        .post("/login",
            controller.loginLocal)
        .post("/logout",
            controller.logout)
        .post("/changerole",
            auth.isInRole('admin'),
            auth.isAuthenticated,
            controller.promote);

    return router;
};