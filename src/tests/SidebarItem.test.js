import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import SidebarItem from "../components/common/SidebarItem";
import configureMockStore from "redux-mock-store";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("SidebarItem", () => {
  const item = {
    sidebarProps: {
      icon: <div data-testid="DashboardIcon" />,
      displayText: "Dashboard",
    },
    path: "/dashboard",
    state: "dashboard",
  };

  const mockStore = configureMockStore([]);
  const initialState = {
    appState: "",
  };
  const store = mockStore(initialState);

  it("renders SidebarItem with active state", () => {
    useSelector.mockReturnValue({ appState: "dashboard" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SidebarItem item={item} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("DashboardIcon")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders SidebarItem without active state", () => {
    useSelector.mockReturnValue({ appState: "anotherState" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SidebarItem item={item} selected={true}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId("DashboardIcon")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("does not render SidebarItem when path is missing", () => {
    const itemWithoutPath = { ...item, path: undefined };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SidebarItem item={itemWithoutPath} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Item")).not.toBeInTheDocument();
  });

  it("does not render SidebarItem when sidebarProps are missing", () => {
    const itemWithoutProps = { ...item, sidebarProps: undefined };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SidebarItem item={itemWithoutProps} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample Item")).not.toBeInTheDocument();
  });
});
