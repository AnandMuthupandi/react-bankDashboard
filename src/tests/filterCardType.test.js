import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterCardType from "../components/filterCardType/FilterCardType";

const clientAccounts = [
  {
    id: "123",
    card_type: "VISA",
    number: 402400,
    balance: 100,
    created: "2021-04-24 12:39:31+00:00",
  },
];

describe("PieChart Component", () => {
  test("renders FilterCardType component", () => {
    const mockFilteredCards = jest.fn();

    render(
      <FilterCardType
        clientAccounts={clientAccounts}
        filteredCards={mockFilteredCards}
      />
    );
    const checkboxLabels = clientAccounts.map((account) =>
      screen.getByText(account.card_type)
    );
    expect(checkboxLabels).toHaveLength(clientAccounts.length);
  });

  test("check if the checkbox click correctly returns value", () => {
    const mockFilteredCards = jest.fn();
    render(
      <FilterCardType
        clientAccounts={clientAccounts}
        filteredCards={mockFilteredCards}
      />
    );
    const checkboxes = clientAccounts.map((account) =>
      screen.getByRole("checkbox", { name: account.card_type })
    );
    expect(checkboxes).toHaveLength(clientAccounts.length);

    fireEvent.click(checkboxes[0]);
    expect(mockFilteredCards).toHaveBeenCalledWith({});

    fireEvent.click(checkboxes[0]);
    expect(mockFilteredCards).toHaveBeenCalledWith({ 123: true });
  });
});
