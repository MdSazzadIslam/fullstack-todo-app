"use strict";
const logger = require("../helpers/logger");
const Todo = require("../models/todoModel");

const getTodos = (req, res) => {
  let limit = req.query.limit;
  if (typeof req.query.limit !== "undefined") {
    limit = parseInt(req.query.limit);
  } else {
    limit = 20;
  }

  Todo.find({})
    .sort({ userId: "asc" })
    .limit(Number(limit))
    .exec()
    .then((data) => {
      res.status(200).json({ data: data, status: "true" });
    })
    .catch((err) => {
      logger.error(
        "[get/todos]Error occured while retriving all the records",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while retriving all the records" + err.message,
      });
    });
};

const getTodo = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    return res
      .status(400)
      .json({ status: "false", message: "invalid 'text' expected string" });
  }
  Todo.find({ id })
    .exec()
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .json({ status: "false", message: `No record found for id =${id} ` });
      } else {
        res.status(200).json({ status: "true", data: data });
      }
    })
    .catch((err) => {
      logger.error(
        "[get/todo]Error occured while retriving the record",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while retriving the record" + err.message,
      });
    });
};

const createTodo = (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    dueDate: new Date(req.body.dueDate),
  });

  todo
    .save()
    .then((data) => {
      res.status(201).json({
        status: "true",
        message: "Record saved successfully",
        data: data,
      });
    })
    .catch((err) => {
      logger.error(
        "[post/todo]Error occured while saving the record",
        err.message
      );
      res.status(500).json({
        status: "false",
        message: "Error occured while saving the record" + err.message,
      });
    });
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    logger.error("[put/:id] invalid 'text' expected string");
    return res
      .status(400)
      .json({ status: "false", message: "invalid 'text' expected string" });
  }

  Todo.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        logger.error(
          "[put/:id]Can not update the record with id" + `${id}}`,
          err.message
        );

        res.status(404).send({
          status: "false",
          message: `Can not update the record with id ${id}`,
        });
      } else {
        res
          .status(200)
          .json({ status: "true", message: "Record updated successfully" });
      }
    })
    .catch((err) => {
      logger.error(
        "[put/:id]Error occured while updating the record",
        err.message
      );

      res.status(500).json({
        status: "false",
        message:
          `Error occured while updating the record with id ${id} ` +
          err.message,
      });
    });
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  if (typeof id !== "string") {
    logger.error("[delete/:id] invalid 'text' expected string");
    return res.status(400).send({ message: "invalid 'text' expected string" });
  }

  Todo.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        logger.error(
          `[delete/:id] Can not delete the record with id ${req.params.id}`
        );

        res.status(404).json({
          status: "false",
          message: `Can not delete the record with id ${req.params.id}`,
        });
      } else {
        res
          .status(200)
          .json({ status: "true", message: "Data deleted successfully" });
      }
    })
    .catch((err) => {
      logger.error(
        `[delete/:id] Error occured while deleting the record with id ${req.params.id}`
      );
      res.status(500).json({
        status: "false",
        message:
          `Error occured while deleting the record with id ${req.params.id} ` +
          err.message,
      });
    });
};

const deleteTodos = (req, res) => {
  Todo.deleteMany()
    .then((data) => {
      res.status(200).json({
        status: "true",
        message: `${data.deletedCount} records deleted successfully`,
      });
    })
    .catch((err) => {
      logger.error(
        "[delete/todo] Error occured while deleting all the records",
        err.message
      );

      res.status(500).json({
        status: "false",
        message: "Error occured while deleting all the records " + err.message,
      });
    });
};

const pendingTodos = (req, res) => {
  Todo.find({ completed: false })
    .then((data) => {
      res.status(200).json({
        status: "true",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "false",
        message:
          "Error occured while retriving all the pending records " +
          err.message,
      });
    });
};

const completedTodos = (req, res) => {
  Todo.find({ completed: true })
    .then((data) => {
      res.status(200).json({
        status: "true",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "false",
        message:
          "Error occured while retriving all the completed records " +
          err.message,
      });
    });
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
  pendingTodos,
  completedTodos,
};
