import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingWrapper from "../components/common/loading/LoadingWrapper";

describe("LoadingWrapper component", () => {
    // Mock the page loader component
jest.mock("../components/common/loading/PageLoader", () => () => (
    <div data-testid="mock-page-loader">Mocked Page Loader</div>
  ));
  it("should render the component when isShowLoading is false", () => {
    const componentToRender = <div data-testid="test-component">Content</div>;
   render(
      <LoadingWrapper isShowLoading={false} component={componentToRender} />
    );
    const pageLoader = screen.getByTestId("test-component");
    expect(pageLoader).toBeInTheDocument();
    
  });

  it("should render the PageLoader when isShowLoading is true", () => {
    render(<LoadingWrapper isShowLoading={true} component={<div>Content</div>} />);
    
    const pageLoader = screen.getByTestId("loading");
    expect(pageLoader).toBeInTheDocument();
  });
});
