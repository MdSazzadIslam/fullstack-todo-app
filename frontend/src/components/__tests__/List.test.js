import { render, screen } from "@testing-library/react";

import TodoService from "../../services/todoService";
import Todos from "../../Todos";

describe("getTodos", () => {
  test("should renders all todos", async () => {
    const page = 1,
      limit = 20;
    await TodoService.getTodos(page, limit);
    render(<Todos />);
    await (() => {
      expect(screen.getByText("Loading todos...")).toBeInTheDocument();
    });
  });
});

describe("getTodoByParams", () => {
  test("should renders completed todos", async () => {
    await TodoService.getTodoByParams(true);
    render(<Todos />);
  });
});

describe("getTodoByParams", () => {
  const data = {
    text: "Please improve testing technique in frontend very quickly",
    dueDate: "2021/07/27",
  };
  test("should create a new todo", async () => {
    await TodoService.createTodo(data);
    render(<Todos />);
  });
});
