export const Utility = {
    isEmpty: (value: any) => {
      const checkLength = (data: any) => data.length === 0;
      let typeOfValue = typeof value;
      if (value === undefined || value === null) {
        return true;
      } else if (typeOfValue === "string") {
        return checkLength(value.trim());
      } else if (Array.isArray(value)) {
        return checkLength(value);
      } else if (typeOfValue === "object") {
        return checkLength(Object.keys(value));
      } else if (typeOfValue === "boolean" || typeOfValue === "function") {
        return false;
      }
    },
  };