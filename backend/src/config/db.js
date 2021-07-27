"use strict";
const mongoose = require("mongoose");
const logger = require("../helpers/logger");
module.exports = (db) => {
  const connectDB = () => {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        logger.info("Successfully connected to database");
      })
      .catch((error) => {
        logger.error("Error while connecting to database: ", error);
      });
  };
  connectDB();

  mongoose.connection.on("disconnected", connectDB); // try to connect again to database when when database connection is error
};
