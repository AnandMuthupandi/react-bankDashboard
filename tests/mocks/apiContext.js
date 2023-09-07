const React = require('react');

const ApiContext = React.createContext(undefined);

const useApiContext = () => {
  const context = React.useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within a ApiProvider');
  }
  return context;
};

const ApiProvider = ({
  apiState,
  fetchData,
  apiDispatch,
  children,
}) => {
  const value = { apiState, fetchData, apiDispatch };
  return React.createElement(ApiContext.Provider, { value }, children);
};

module.exports = {
  useApiContext,
  ApiProvider,
};
