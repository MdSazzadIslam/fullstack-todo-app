import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  Icon,
  Paper,
  Box,
  TextField,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import todoService from "./services/todoService";
import List from "./components/List";

const useStyles = makeStyles({
  addTodoContainer: { padding: 10 },
  addTodoButton: { marginLeft: 5 },
  todosContainer: { marginTop: 10, padding: 10 },
  todoContainer: {
    borderTop: "1px solid #bfbfbf",
    marginTop: 5,
    "&:first-child": {
      margin: 0,
      borderTop: "none",
    },
    "&:hover": {
      "& $deleteTodo": {
        visibility: "visible",
      },
    },
  },
  todoTextCompleted: {
    textDecoration: "line-through",
  },
  deleteTodo: {
    visibility: "hidden",
  },
});

function Todos() {
  const classes = useStyles();

  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const fetchTodos = async () => {
    await todoService.getTodos().then((todos) => setTodos(todos));
  };

  useEffect(() => {
    fetchTodos();
  }, [setTodos]);

  const addTodo = async (event) => {
    event.preventDefault();
    console.log(newDueDate.length);
    if (!newTodoText.trim()) {
      alert("Please enter todo ");
      return;
    } else if (newDueDate.length < 8) {
      alert("Please enter due date ");
      return;
    } else {
      const data = {
        text: newTodoText,
        dueDate: newDueDate,
      };
      await todoService
        .createTodo(data)
        .then(async (todo) => await fetchTodos())
        .catch((err) => console.log(err));
      setNewTodoText("");
      setNewDueDate("");
    }
  };

  function toggleTodoCompleted(id) {
    fetch(`http://localhost:3001/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        completed: !todos.find((todo) => todo.id === id).completed,
      }),
    }).then(() => {
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        completed: !newTodos[modifiedTodoIndex].completed,
      };
      setTodos(newTodos);
    });
  }

  const deleteTodoHandler = async (id) => {
    await todoService
      .deleteTodo(id)
      .then(async (res) => {
        console.log(res);
        await fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await addTodo();
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Todos
      </Typography>
      <Paper className={classes.addTodoContainer}>
        <Box display="flex" flexDirection="row">
          <Box flexGrow={1}>
            <TextField
              fullWidth
              placeholder="Write your todo here..."
              name="newTodoText"
              autoFocus
              value={newTodoText}
              onChange={(event) => setNewTodoText(event.target.value)}
            />

            <TextField
              fullWidth
              placeholder="Write your due date here..."
              name="newDueDate"
              type="date"
              value={newDueDate}
              onKeyPress={(event) => {
                handleKeyPress(event);
              }}
              onChange={(event) => setNewDueDate(event.target.value)}
            />
          </Box>
          {newTodoText.length > 0 && newDueDate.length > 8 ? (
            <Button
              className={classes.addTodoButton}
              startIcon={<Icon>add</Icon>}
              onClick={(event) => addTodo(event)}
            >
              Add
            </Button>
          ) : null}
        </Box>
      </Paper>
      {todos.length > 0 ? (
        <Paper className={classes.todosContainer}>
          <Box display="flex" flexDirection="column" alignItems="stretch">
            <List
              todos={todos}
              todoContainer={classes.todoContainer}
              todoTextCompleted={classes.todoTextCompleted}
              deleteTodoClass={classes.deleteTodo}
              toggleTodoCompleted={(id) => toggleTodoCompleted(id)}
              deleteTodoHandler={(id) => deleteTodoHandler(id)}
            />
          </Box>
        </Paper>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
}

export default Todos;
