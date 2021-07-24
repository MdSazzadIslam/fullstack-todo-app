"use strict";

const express = require("express");
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
} = require("../controllers/todoController");
const {
  todoValidationRules,
  validateTodo,
} = require("../middlewares/validator");

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/create", [todoValidationRules(), validateTodo], createTodo);
router.put("/update/:id", [todoValidationRules(), validateTodo], updateTodo);
router.delete("/delete/:id", deleteTodo);
router.delete("/delete", deleteTodos);
module.exports = router;
