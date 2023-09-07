const API = {
  URL: "https://api-ashen-chi.vercel.app/api",
};

export const CONSTANTS = {
  ACTIONS: {
    API_FETCHING_SUCCESS: "API_FETCHING_SUCCESS",
    API_FETCHING_ERROR: "API_FETCHING_ERROR",
    SELECTED_CLIENT_NAME: "SELECTED_CLIENT_NAME",
    CLIENT_ACCOUNTS: "CLIENT_ACCOUNTS",
  },
  API: {
    CLIENTS: {
      URL: API.URL + "/clients",
      ID: "clients",
    },
    ACCOUNTS: {
      URL: API.URL + "/accounts",
      ID: "accounts",
    },
    CLIENT_ACCOUNTS: {
      URL: API.URL + "/accounts?client=",
      ID: "clientAccounts",
    },
    CREATE_ACCOUNT: {
      URL: API.URL + "accounts",
      ID: "accounts",
    },
  },
};
