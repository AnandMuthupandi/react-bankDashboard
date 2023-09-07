import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

// Mock the Empty Accounts component
jest.mock("../components/common/SidebarItem", () => () => (
  <div data-testid="mock-sidebarItem">Home,Dashboard</div>
));

jest.mock("../assets", () => ({
  images: {
    logo: "../assets/images/bank-logo.png",
    zeroAccount: "../assets/images/bank-logo.png",
  },
}));

describe("Sidebar Component", () => {
  it("renders the Sidebar component", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const avatarElement = screen.getByAltText("Logo");
    expect(avatarElement).toBeInTheDocument();
    const sidebarElement1 = screen.getAllByTestId("mock-sidebarItem")[0];
    expect(sidebarElement1).toBeInTheDocument();
    const sidebarElement2 = screen.getAllByTestId("mock-sidebarItem")[1];
    expect(sidebarElement2).toBeInTheDocument();
  });

  it("renders sidebar items based on appRoutes", () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    const sidebarItemElement1 = screen.getAllByText("Home,Dashboard")[0];
    expect(sidebarItemElement1).toBeInTheDocument();
    const sidebarItemElement2 = screen.getAllByText("Home,Dashboard")[1];
    expect(sidebarItemElement2).toBeInTheDocument();
  });
});
