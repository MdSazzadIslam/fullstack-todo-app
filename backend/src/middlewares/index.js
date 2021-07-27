"use strict";
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const connectRedis = require("../config/redis");
const middleware = (app) => {
  app.use(helmet());
  app.use(express.json());
  app.use(cors());
  app.use(compression());

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    console.error(err.stack);
    res.status(500).send({ error: "Something broke!" });
  });
};

module.exports = middleware;
