import React from "react";
import PageLoader from "./PageLoader";

interface LoadingWrapperProps {
  isShowLoading: boolean;
  component: React.ReactNode;
}

function LoadingWrapper(props: LoadingWrapperProps): JSX.Element {
  const { isShowLoading, component } = props;
  return (
    <>
      {isShowLoading && <PageLoader />}
      {!isShowLoading && component}
    </>
  );
}

export default LoadingWrapper;
