// Import necessary dependencies for testing
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Home from "../pages/home/HomePage";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the ApiContext
jest.mock("../../src/contexts/apicontext", () => {
  return {
    useApiContext: jest.fn(() => ({
      apiState: {
        clients: {
          data: [
            {
              id: "12345",
              name: "Anand",
              firstname: "Test",
              address: "Brussels",
              created: "2021-04-23 22:39:40+00:00",
              birthday: "1989-05-23 13:25:14",
              accounts: [],
            },
          ],
          error: null,
        },
      },
      fetchData: jest.fn(),
    })),
  };
});
jest.mock("../pages/clientDetails/ClientDetails", () => () => {
  return <mock-clientDetails data-testid="clientDetails" />;
});

describe("Home Component", () => {
  afterEach(cleanup);
  function tree() {
    return render(
      <Router>
        <Home />
      </Router>
    );
  }
  test("If Home Component is rendered", () => {
    expect(tree()).toMatchSnapshot();
  });

  test("If Home Component have clientDetails component called", () => {
    expect(tree()).toMatchSnapshot();
    expect(screen.getAllByTestId("clientDetails")).toBeTruthy();
  });
});
