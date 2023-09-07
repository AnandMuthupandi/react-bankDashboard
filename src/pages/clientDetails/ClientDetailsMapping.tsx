import { IClientDetails } from "../../interfaces/types";

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
      value: client.birthday,
    },
    {
      label: "Address",
      value: client.address,
    },
  ];
};
