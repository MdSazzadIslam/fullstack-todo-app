import React from "react";
import { Typography, Button, Icon, Box, Checkbox } from "@material-ui/core";
import moment from "moment";

const List = ({
  todos,
  todoContainer,
  todoTextCompleted,
  deleteTodoClass,
  toggleTodoCompleted,
  deleteTodoHandler,
  editTodoHandler,
}) => {
  const toggleChange = async (id) => {
    await toggleTodoCompleted(id);
  };

  const deleteTodo = async (id) => {
    await deleteTodoHandler(id);
  };

  const editTodo = async (id, text, dueDate) => {
    await editTodoHandler(id, text, dueDate);
  };

  const todoList = todos.map((todo) => {
    return (
      <Box
        key={todo._id}
        display="flex"
        flexDirection="row"
        alignItems="center"
        className={todoContainer}
      >
        <Checkbox
          checked={todo.completed}
          onChange={() => toggleChange(todo._id)}
        ></Checkbox>
        <Box flexGrow={1}>
          <Typography
            className={todo.completed ? todoTextCompleted : ""}
            variant="body1"
          >
            {todo.text}
          </Typography>
          <Box flexGrow={1}>{moment(todo.dueDate).format("YYYY-MM-DD")}</Box>
        </Box>

        <Button
          className={deleteTodoClass}
          startIcon={<Icon>edit</Icon>}
          onClick={() => editTodo(todo._id, todo.text, todo.dueDate)}
        >
          Edit
        </Button>

        <Button
          className={deleteTodoClass}
          startIcon={<Icon>delete</Icon>}
          onClick={() => deleteTodo(todo._id)}
        >
          Delete
        </Button>
      </Box>
    );
  });

  return <>{todoList}</>;
};

export default List;
