'use strict';

const path = require("path"),
    express = require('express'),
    app = require("./app/app").getApp();

app.use(express.static('./build/public'));

const session = require('express-session'),
    morgan = require("morgan"),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    data = require('./app/data'),
    { PORT, secret } = require("./app/config");

app.use(morgan("combined"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, maxAge: 6000000 }
}));

require('./app/passport/')(app, data);

app.use("/api/images", require("./app/routers/images_router")(data));
app.use("/api/users", require("./app/routers/user_router")(data));
app.use("/api/estates", require("./app/routers/estate_router")(data));

app.listen(PORT);
console.log(`App running on port ${PORT}`);