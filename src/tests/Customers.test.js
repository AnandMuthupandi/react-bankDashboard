import React from "react";
import { render, screen } from "@testing-library/react";
import Customers from "../pages/customers/Customers";

// Mock the image source to avoid loading images during tests
jest.mock("../assets", () => ({
  images: {
    underConstruction: "../assets/images/underConstruction.png"
  },
}));

describe("Customers component", () => {
  it("should render with the correct image and alt text", () => {
    render(<Customers />);
    const imageElement = screen.getByAltText("inprogress");
    expect(imageElement).toBeInTheDocument();
  });
});
