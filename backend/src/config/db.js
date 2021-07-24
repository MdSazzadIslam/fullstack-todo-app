"use strict";
const mongoose = require("mongoose");
const logger = require("../helpers/logger");
module.exports = (db) => {
  const connect = () => {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        logger.info(`Successfully connected to database`);
      })
      .catch((error) => {
        logger.error("Error connecting to database: ", error);
      });
  };
  connect();

  mongoose.connection.on("disconnected", connect); // try to connect again to database when when database connection is error
};
