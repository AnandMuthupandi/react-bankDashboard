import moment from "moment";

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

export const colorMapping = (cardType: string) => {
  switch (cardType) {
    case "VISA":
      return "green";
    case "MasterCard":
      return "orange";
    case "American Express":
      return "blue";
    default:
      return "red";
  }
};

export const parseDate = (date: string) => {
  if (isValidDateFormat(date)) {
    const inputDateFormat = "YYYY-MM-DD HH:mm:ssZ";
    const parsedDate = moment(date, inputDateFormat);
    return parsedDate.format("DD-MMM-YYYY");
  } else {
    return date;
  }
};

export const isValidDateFormat = (date: string) => {
  const dateFormatRegex =
    /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\+\d{2}:\d{2})|(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})$/;
  return dateFormatRegex.test(date);
};
