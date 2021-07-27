"use strict";
const express = require("express");
const routes = require("./routes");
const middleware = require("./middlewares");
const app = express();

middleware(app);
app.use(routes);

module.exports = app;
