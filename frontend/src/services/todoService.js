class TodoService {
  static getTodos = (page, limit) => {
    debugger;
    return fetch(
      process.env.REACT_APP_API_URL +
        "?page=" +
        `${page}` +
        "&limit=" +
        `${limit}` //passing 'limit' and 'page' as query parameters to node.js server
    ).then(
      (response) => response.json() // Converting received data to JSON
    );
  };

  static getTodoByParams = (searchBy) => {
    console.log(searchBy);
    return fetch(process.env.REACT_APP_API_URL + "/" + `${searchBy}`).then(
      (response) => response.json()
    );
  };

  static createTodo = (data) => {
    return fetch(process.env.REACT_APP_API_URL + "/create", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  static updateTodo = (data, id) => {
    return fetch(process.env.REACT_APP_API_URL + "/update/" + `${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data, id),
    }).then((response) => response.json());
  };

  static deleteTodo = (id) => {
    return fetch(process.env.REACT_APP_API_URL + "/delete/" + `${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  };

  static deleteTodos = () => {
    return fetch(process.env.REACT_APP_API_URL + "/delete", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((response) => response.json());
  };
}
export default TodoService;
