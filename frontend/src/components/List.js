import React from "react";
import { Typography, Button, Icon, Box, Checkbox } from "@material-ui/core";
import moment from "moment";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const List = ({
  todos,
  todoContainer,
  todoTextCompleted,
  deleteTodoClass,
  toggleTodoHandler,
  deleteTodoHandler,
  editTodoHandler,
  dragHandler,
}) => {
  const toggleChange = async (id, checked) => {
    await toggleTodoHandler(id, checked);
  };

  const deleteTodo = async (id) => {
    await deleteTodoHandler(id);
  };

  const editTodo = async (id, text, dueDate) => {
    await editTodoHandler(id, text, dueDate);
  };

  const onDragEnd = (result) => {
    dragHandler(result);
  };

  const todoList = todos.map((todo, index) => {
    return (
      <Draggable key={todo._id} draggableId={todo._id} index={index}>
        {(provided) => (
          <Box
            key={todo._id}
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={todoContainer}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Checkbox
              checked={todo.completed}
              onChange={(e) => toggleChange(todo._id, e.target.checked)}
            ></Checkbox>

            <Box flexGrow={1}>
              <Typography
                className={todo.completed ? todoTextCompleted : ""}
                variant="body1"
              >
                {todo.text}
              </Typography>
              <Box flexGrow={1}>
                {moment(todo.dueDate).format("YYYY-MM-DD")}
              </Box>
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
        )}
      </Draggable>
    );
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            {todoList}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
