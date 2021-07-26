/* import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoService from "../../services/todoService";
import Todos from "../../Todos";

const id = "60fc3132cdcc022aac9df1df";
const searchBy = true;
test("should renders all todos", async function () {
  const page = 1,
    limit = 20;
  const result = await TodoService.getTodos(page, limit);

  //console.log(result);
  render(<Todos />);
});
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import List from "../List";

const mockData = [
  {
    _id: "60fc30ff6bae0742900f39a9",
    completed: true,
    text: "Do you watch the tutorial on MongoDB",
    dueDate: "2021-07-24",
  },
  {
    _id: "60fc3132cdcc022aac9df1df",
    completed: false,
    text: "You should take holiday for couple of days",
    dueDate: "2021-07-24",
  },
];

describe("todo list test", () => {
  it("should show title of todos", () => {
    render(<List todos={mockData} />);
    mockData.forEach((d) =>
      expect(screen.getByText(d._id)).toBeInTheDocument()
    );
  });
});
