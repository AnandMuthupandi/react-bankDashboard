import { IClientDetails } from "../../interfaces/types";
import { parseDate } from "../../utils/utilities";

export const clientDetailsMapping = (client: IClientDetails) => {
  return [
    {
      label: "First Name :",
      value: client.firstname,
    },
    {
      label: "Name :",
      value: client.name,
    },
    {
      label: "Date of Birth",
      value: parseDate(client.birthday),
    },
    {
      label: "Address",
      value: client.address,
    },
  ];
};
