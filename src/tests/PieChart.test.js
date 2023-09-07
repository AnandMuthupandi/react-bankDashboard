import React from "react";
import { render, screen } from "@testing-library/react";
import PieChart from "../components/pieChart/PieChart";

// Mock the onSegmentClick function
const mockOnSegmentClick = jest.fn();

const clientAccounts = [{
    id: "6084118399e57e9b1e12ac45",
    card_type: "VISA",
    number: 402400,
    balance: 100,
    created: "2021-04-24 12:39:31+00:00"
}];
describe("PieChart Component", () => {
test("renders PieChart component and find if the balance segment >=0 is visible", () => {
 render(
    <PieChart
      width={400}
      height={400}
      clientAccounts={clientAccounts}
      onSegmentClick={mockOnSegmentClick}
    />
  );

  expect(screen.getByText("Balance >=0")).toBeInTheDocument();
});
test("renders PieChart component and find if the balance segment >0 is visible", () => {
    const clientAccountsMinus = [{
        id: "6084118399e57e9b1e12ac45",
        card_type: "VISA",
        number: 402400,
        balance: -100,
        created: "2021-04-24 12:39:31+00:00"
    }];
    render(
       <PieChart
         width={400}
         height={400}
         clientAccounts={clientAccountsMinus}
         onSegmentClick={mockOnSegmentClick}
       />
     );
   
     expect(screen.getByText("Balance <0")).toBeInTheDocument();
   });
});
