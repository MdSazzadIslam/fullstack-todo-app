"use strict";
const mongoose = require("mongoose");
require("dotenv").config();
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      return console.info("connected to database");
    })
    .catch((error) => {
      console.error("Error connecting to database: ", error);
      return process.exit(1);
    });
};

module.exports = connect;
