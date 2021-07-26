import React from "react";
import { render } from "@testing-library/react";
import Todos from "./Todos";
describe("<Todos /> tests", () => {
  it("renders <Todos />", () => {
    render(<Todos />);
  });
});
