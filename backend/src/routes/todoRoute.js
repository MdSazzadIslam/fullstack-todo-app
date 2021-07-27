"use strict";

const express = require("express");
const router = express.Router();
const {
  getTodos,
  getTodoByParams,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
  pendingTodos,
  completedTodos,
} = require("../controllers/todoController");
const {
  todoValidationRules,
  validateTodo,
} = require("../middlewares/validator");
const { cacheCheck, cacheCommonCheck } = require("../middlewares/cache");
router.get("/", cacheCheck, getTodos);
router.get("/completed", completedTodos);
router.get("/pending", pendingTodos);
router.get("/:searchBy", cacheCommonCheck, getTodoByParams);
router.post("/create", [todoValidationRules(), validateTodo], createTodo);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);
router.delete("/delete", deleteTodos);
module.exports = router;
