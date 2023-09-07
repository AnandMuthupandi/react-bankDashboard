import { Utility } from "./utilities";

export const APIUtility = {
  apiGetOptions: (headers = {}) => {
    return {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        mode: "no-cors",
        ...headers,
      }),
    };
  },

  generateApiUrl: (url) => {
    return url;
  },

  validateApiDetails: (apiDetails, contextDetails) => {
    let { isToStoreInContext, apiId } = contextDetails;
    if (isToStoreInContext && Utility.isEmpty(apiId)) {
      throw new Error(
        `apiId must be present to store api response in context.`
      );
    }
    Object.keys(apiDetails).forEach((key) => {
      if (Utility.isEmpty(key)) {
        throw new Error(
          `The value provided to ${key} to call an api is not valid.`
        );
      }
    });
  },

  parseResponse: (response) => {
    return {
      data: response.data,
      error: response.error,
    };
  },
};
