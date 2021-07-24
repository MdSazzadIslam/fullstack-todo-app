"use strict";
const { check, validationResult } = require("express-validator");
const logger = require("../helpers/logger");
const todoValidationRules = () => {
  return [check("text", "Text is required").not().isEmpty()];
};

const validateTodo = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    logger.error(messages);
    return res.status(500).send({ message: messages });
  }
  next();
};

module.exports = {
  todoValidationRules,
  validateTodo,
};
