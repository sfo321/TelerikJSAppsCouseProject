const Router = require("express").Router,
    auth = require('../middleware/auth-middleware'),
    passport = require('passport'),
    estateController = require('../controllers/estate_controller'),
    dataMiddleware = require('../middleware/data-middleware');

module.exports = (data) => {
    const router = new Router(),
        controller = estateController.create(data);

    router.get("/all",
            controller.getAllEstates)
        .get("/:id",
            controller.getEstateById)
        .post("/add",
            auth.isAuthenticated,
            controller.createEstate)
        .put("/remove/:id",
            auth.isAuthenticated,
            dataMiddleware.isAuthor,
            controller.removeEstate)
        .put("/remove/:id",
            auth.isAuthenticated,
            dataMiddleware.isAuthor,
            controller.removeEstate);
    return router;
};