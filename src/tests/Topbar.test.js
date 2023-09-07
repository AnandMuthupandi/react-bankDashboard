import React from "react";
import { render, screen } from "@testing-library/react";
import Topbar from "../components/common/Topbar";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the SearchDropDown component
jest.mock("../components/searchDropDown/SearchDropDown", () => () => (
  <div data-testid="mock-search-dropdown">Mocked search</div>
));

test("renders the Topbar component", () => {
  render(
    <Router>
      <Topbar />
    </Router>
  );

  const searchDropdownElement = screen.getByTestId("mock-search-dropdown");
  expect(searchDropdownElement).toBeInTheDocument();
});

test("has the correct background color and text color", () => {
  render(
    <Router>
      <Topbar />
    </Router>
  );

  const topbarElement = screen.getByTestId("Appbar");
  expect(topbarElement).toHaveStyle("background-color: #fff");
});
