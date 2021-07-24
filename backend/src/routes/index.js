"use strict";

const express = require("express");
const todoRoute = require("./todoRoute");

const router = express.Router();
router.use("/api/v1/todo", todoRoute);

module.exports = router;
