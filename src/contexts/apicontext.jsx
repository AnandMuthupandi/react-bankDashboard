import React from "react";
import { CONSTANTS } from "../utils/constants";
import { APIUtility } from "../utils/apiutilities";

const ApiContext = React.createContext();

const initialApiState = {
  apiState: {
    clientAccounts: {}, // This holds data for different client IDs
  },
};

function apiReducer(state, action) {
  switch (action.type) {
    case CONSTANTS.ACTIONS.API_FETCHING_SUCCESS: {
      let { apiId, data } = action;
      return {
        ...state,
        [apiId]: {
          data,
          error: null,
        },
      };
    }
    case CONSTANTS.ACTIONS.API_FETCHING_ERROR: {
      let { apiId, error } = action;
      return {
        ...state,
        [apiId]: {
          data: null,
          error,
        },
      };
    }
    case CONSTANTS.ACTIONS.SELECTED_CLIENT_NAME:
      return {
        ...state,
        selectedClient: {
          name: action.data.name,
          id: action.data.id,
        },
      };
    case CONSTANTS.ACTIONS.CLIENT_ACCOUNTS: {
      const { clientId, resp } = action;
      return {
        ...state,
        apiState: {
          ...state.apiState,
          clientAccounts: {
            ...state.apiState.clientAccounts,
            [clientId]: resp,
          },
        },
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const parseResponse = async (res) => {
  if (res.ok) {
    try {
      let data = await res.json();
      return Promise.resolve(data);
    } catch (error) {
      return Promise.resolve({});
    }
  }
  return Promise.reject(res);
};

const callFetch = (apiDispatch) => {
  return ({
    url = "",
    apiId = "",
    options = APIUtility.apiGetOptions(),
    isToStoreInContext = false,
    successCallback = () => {},
    errorCallback = () => {},
  }) => {
    APIUtility.validateApiDetails(
      {
        url,
        options,
        successCallback,
        errorCallback,
      },
      {
        isToStoreInContext,
        apiId,
      }
    );

    const handleSuccess = (data) => {
      if (isToStoreInContext) {
        apiDispatch({
          type: CONSTANTS.ACTIONS.API_FETCHING_SUCCESS,
          apiId,
          data,
        });
      } else {
        if (apiId === "clientAccounts") {
          apiDispatch({
            type: CONSTANTS.ACTIONS.API_FETCHING_SUCCESS,
            apiId,
            data,
          });
        }
        successCallback(data);
      }
    };

    const handleError = (error) => {
      if (isToStoreInContext) {
        apiDispatch({
          type: CONSTANTS.ACTIONS.API_FETCHING_ERROR,
          apiId,
          error,
        });
      } else {
        errorCallback(error);
      }
    };

    const handleException = (err) => {
      try {
        handleError({
          code: "",
          message:
            "System is unavailable to respond now. Please try again later.",
        });
        err.json().then(handleError);
      } catch (error) {
        handleError({
          code: "",
          message:
            "System is unavailable to respond now. Please try again later.",
        });
      }
    };

    fetch(url, options)
      .then(parseResponse)
      .then(handleSuccess)
      .catch(handleException);
  };
};

function useApiContext() {
  const context = React.useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApiContext must be used within a ApiProvider");
  }
  return context;
}

function ApiProvider(props) {
  const [apiState, apiDispatch] = React.useReducer(apiReducer, initialApiState);
  const fetchData = callFetch(apiDispatch);
  const value = { apiState, fetchData, apiDispatch };
  return <ApiContext.Provider value={value} {...props} />;
}

export { ApiProvider, useApiContext };
