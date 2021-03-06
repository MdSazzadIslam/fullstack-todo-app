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
  CircularProgress,
  Select,
  MenuItem,
} from "@material-ui/core";
import TodoService from "./services/todoService";
import List from "./components/List";
import moment from "moment";
import debounce from "lodash.debounce";

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
  const [newDueDate, setNewDueDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [searchId, setSearchId] = useState("all");
  const [dueDate, setDueDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const fetchTodos = () => {
    debugger;
    setLoading(true);
    TodoService.getTodos(page, limit).then((todos) => setTodos(todos));
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, [setTodos]);

  const addTodo = (event) => {
    event.preventDefault();
    if (id) {
      //if id exist then update  will work otherwise save
      {
        const data = {
          text: newTodoText,
          dueDate: newDueDate,
        };
        TodoService.updateTodo(data, id)
          .then(async () => await fetchTodos()) //Only want to fetch data when update is successfull
          .catch((err) => console.log(err));
        clearFiled();
      }
    } else {
      if (!newTodoText.trim()) {
        return;
      } else if (newDueDate.length < 8) {
        return;
      } else {
        const data = {
          text: newTodoText,
          dueDate: newDueDate,
        };
        TodoService.createTodo(data)
          .then(async () => await fetchTodos())
          .catch((err) => console.log(err));
        clearFiled();
      }
    }
  };

  const toggleTodoHandler = (id, checked) => {
    debugger;
    if (!id.trim()) {
      return;
    } else {
      const data = {
        completed: checked,
      };
      TodoService.updateTodo(data, id)
        .then(async () => await fetchTodos())
        .catch((err) => console.log(err));
    }
  };

  const deleteTodoHandler = (id) => {
    TodoService.deleteTodo(id)
      .then(async (res) => {
        await fetchTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editTodoHandler = (id, text, dueDate) => {
    setNewDueDate(moment(new Date(dueDate)).format("YYYY-MM-DD"));
    setNewTodoText(text);
    setId(id);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await addTodo();
    }
  };

  const clearFiled = () => {
    setNewTodoText("");
    setNewDueDate("");
    setId("");
  };

  const handleSelectChange = (event) => {
    setSearchId(event.target.value);

    if (event.target.value === "all") {
      setLoading(true);
      TodoService.getTodos(page, limit).then((todos) => setTodos(todos));
      setLoading(false);
    } else {
      setLoading(true);
      TodoService.getTodoByParams(event.target.value).then((todos) =>
        setTodos(todos)
      );
    }
    setLoading(false);
  };

  const handleDateChange = (event) => {
    console.log(event.target.value);
    setDueDate(event.target.value);
    setLoading(true);
    TodoService.getTodoByParams(event.target.value).then((todos) =>
      setTodos(todos)
    );
    setLoading(false);
  };
  window.onscroll = debounce(async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      await fetchMoreTodos();
    }
  }, 100);
  const fetchMoreTodos = () => {
    setPage(page + 1);
    TodoService.getTodos(page + 1, limit)
      .then((todo) => setTodos(todos.concat(todo)))
      .catch((err) => console.log(err));
  };

  const dragHandler = (result) => {
    debugger;
    if (!result.destination) return;

    const items = Array.from(todos); //here todos is a droppableId
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
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
              {id ? "Update" : "Add"}
            </Button>
          ) : null}
        </Box>
      </Paper>

      {loading === false ? (
        <Paper className={classes.todosContainer}>
          <Box display="flex" flexDirection="row">
            <TextField
              fullWidth
              placeholder="enter date for searching..."
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={(event) => handleDateChange(event)}
            />
            <Select value={searchId} onChange={(e) => handleSelectChange(e)}>
              <MenuItem value="false">Pending</MenuItem>
              <MenuItem value="true">Completed</MenuItem>
              <MenuItem value="all">All</MenuItem>
            </Select>
          </Box>

          <Box display="flex" flexDirection="column" alignItems="stretch">
            <List
              todos={todos}
              todoContainer={classes.todoContainer}
              todoTextCompleted={classes.todoTextCompleted}
              deleteTodoClass={classes.deleteTodo}
              toggleTodoHandler={(id, checked) =>
                toggleTodoHandler(id, checked)
              }
              deleteTodoHandler={(id) => deleteTodoHandler(id)}
              editTodoHandler={(id, text, dueDate) =>
                editTodoHandler(id, text, dueDate)
              }
              dragHandler={(result) => dragHandler(result)}
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
