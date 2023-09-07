import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import ClientDetails from "../pages/clientDetails/ClientDetails";

// Mock the useApiContext hook
jest.mock("../../src/contexts/apicontext", () => ({
  useApiContext: () => ({
    apiState: {
      selectedClient: {
        name: "Brian",
        id: "123",
      },
    },
  }),
}));

// Mock the Charts component
jest.mock("../../src/components/common/Charts", () => () => (
  <div>Mocked Charts</div>
));

// Mock the AccountsTable component
jest.mock(
  "../../src/pages/accountsTable/AccountsTable",
  () =>
    ({ selectedClient }) => (
      <div data-testid="mock-accounts-table">
        Mocked AccountsTable for {selectedClient.name}
      </div>
    )
);

describe("ClientDetails Component", () => {
  it("renders client information correctly", () => {
    const clientData = [
      {
        id: "1",
        name: "OReilly",
        firstname: "Brian",
      },
    ];

    render(<ClientDetails clientData={clientData} />);

    expect(screen.getByText("Client ID : 1")).toBeInTheDocument();
    expect(screen.getByText("Client ID : 1")).toBeInTheDocument();
    expect(screen.getByText("Mocked Charts")).toBeInTheDocument();
  });

  it('opens modal when "More" button is clicked', () => {
    const clientData = [
      {
        id: "1",
        name: "OReilly",
        firstname: "Brian",
      },
    ];

    render(<ClientDetails clientData={clientData} />);

    fireEvent.click(screen.getByText("More"));

    const accountsTable = screen.getByTestId("mock-accounts-table");
    expect(accountsTable).toBeInTheDocument();
  });
});
