const Router = require("express").Router,
    auth = require('../middleware/auth-middleware'),
    passport = require('passport'),
    imagesController = require('../controllers/images_controller'),
    dataMiddleware = require('../middleware/data-middleware');

module.exports = (data) => {
    const router = new Router();
    const controller = imagesController.create(data);

    router.get("/all",
            controller.getAll)
        .get("/:id",
            controller.getById)
        .get("/:title",
            controller.getByTitle)
        .post("/create",
            //auth.isAuthenticated,
            controller.create);
    return router;
};