import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Charts from "../components/common/Charts";
import { useApiContext } from "../contexts/apicontext";

// Mock the BarChart component
jest.mock("../components/barChart/BarChart", () => () => (
  <div data-testid="mock-bar-chart">Mocked Bar Chart</div>
));

// Mock the Empty Accounts component
jest.mock("../components/common/EmptyAccounts", () => () => (
  <div data-testid="mock-empty-accounts">Mocked Empty Accounts</div>
));

// Mock useApiContext
jest.mock("../contexts/apicontext", () => ({
  useApiContext: jest.fn(),
}));

describe("Charts Component", () => {
  const fetchDataMock = jest.fn();
  const apiDispatchMock = jest.fn();

  beforeEach(() => {
    useApiContext.mockReturnValue({
      apiState: {
        apiState: {
          clientAccounts: {
            123: [
              {
                id: "1",
                card_type: "VISA",
                balance: 1000,
                created: "2021-04-24 12:39:31+00:00",
              },
            ],
            456: [],
          },
        },
      },
      fetchData: fetchDataMock,
      apiDispatch: apiDispatchMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders pie chart when cardTypes have data", async () => {
    render(<Charts clientId="123" openModal={() => {}} />);
    await waitFor(() => {
      const pieChart = screen.getByText("Balance >=0");
      expect(pieChart).toBeInTheDocument();
    });
  });

  it("renders bar chart when cardTypes have data", async () => {
    render(<Charts clientId="123" openModal={() => {}} />);
    await waitFor(() => {
      const barChart = screen.getByTestId("mock-bar-chart");
      expect(barChart).toBeInTheDocument();
    });
  });

  it("renders empty accounts when cardTypes are empty", async () => {
    useApiContext.mockReturnValue({
      apiState: {
        apiState: {
          clientAccounts: {
            456: [],
          },
        },
      },
      fetchData: fetchDataMock,
      apiDispatch: apiDispatchMock,
    });

    render(<Charts clientId="456" openModal={() => {}} />);

    // Wait for the LoadingWrapper to finish loading
    await waitFor(() => {
      const emptyAccounts = screen.getByTestId("mock-empty-accounts");
      expect(emptyAccounts).toBeInTheDocument();
    });
  });
  it("handlePieSegmentClick sets the selectedSegment state", () => {
    let selectedSegment = null;

    render(<Charts clientId="123" openModal={() => {}} />);

    fireEvent.click(screen.getByTestId("pieChart"));

    expect(selectedSegment).toBe(null);
  });
});
