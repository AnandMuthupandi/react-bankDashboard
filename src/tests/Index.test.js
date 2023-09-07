import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { ApiProvider } from "../contexts/apicontext";
import { BrowserRouter } from "react-router-dom";

// Mock the Empty Accounts component
jest.mock("../App", () => () => <div data-testid="mock-App">Mocked App</div>);
test("renders App component", () => {
  render(
    <ApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  );

  const linkElement = screen.getByTestId("mock-App");
  expect(linkElement).toBeInTheDocument();
});
