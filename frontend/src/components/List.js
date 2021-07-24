import React from "react";
import { Typography, Button, Icon, Box, Checkbox } from "@material-ui/core";

const List = ({
  todos,
  todoContainer,
  todoTextCompleted,
  deleteTodoClass,
  toggleTodoCompleted,
  deleteTodoHandler,
}) => {
  const toggleChange = async (id) => {
    await toggleTodoCompleted(id);
  };

  const deleteTodo = async (id) => {
    await deleteTodoHandler(id);
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
        </Box>
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
