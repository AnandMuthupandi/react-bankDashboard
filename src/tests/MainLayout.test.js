import React from "react";
import { render, screen } from "@testing-library/react";
import MainLayout from "../../src/components/layout/MainLayout";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the Empty Accounts component
jest.mock("../../src/components/common/Sidebar", () => () => (
  <div data-testid="mock-sidebar">Mocked side bar</div>
));

// Mock the Empty Accounts component
jest.mock("../../src/components/common/SidebarItem", () => () => (
  <div data-testid="mock-sidebarItem">Mocked side bar item</div>
));

// Mock the Empty Accounts component
jest.mock("../../src/components/common/TopBar", () => () => (
  <div data-testid="mock-topbar">Mocked Top bar</div>
));

describe("MainLayout Component", () => {
  test("renders the MainLayout component with Topbar, Sidebar, and Outlet", () => {
    render(
      <Router>
        <MainLayout />
      </Router>
    );

    const topbarElement = screen.getByTestId("mock-topbar");
    const sidebarElement = screen.getByTestId("mock-sidebar");

    expect(topbarElement).toBeInTheDocument();
    expect(sidebarElement).toBeInTheDocument();
  });
});
