import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

// Mock the Empty Accounts component
jest.mock("../../src/components/layout/MainLayout", () => () => (
  <div data-testid="mock-main-layout">Mocked Main Layout</div>
));
test("renders the main layout", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const mainLayoutElement = screen.getByTestId("mock-main-layout");
  expect(mainLayoutElement).toBeInTheDocument();
});
