import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputAdornment,
  InputLabel,
  IconButton,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useApiContext } from "../../contexts/apicontext";
import { CONSTANTS } from "../../utils/constants";
import ClearIcon from "@mui/icons-material/Clear";

function SearchDropDown() {
  const { apiState, apiDispatch } = useApiContext();
  const [selectedClientName, setSelectedClientName] = useState("");
  const clientsAPIId = CONSTANTS.API.CLIENTS.ID;
  let clientNames: any;
  if (apiState[clientsAPIId] && apiState[clientsAPIId].data) {
    clientNames = apiState[clientsAPIId].data.map((client: any) => ({
      id: client.id,
      name: client.firstname !== null ? client.firstname : client.name,
    }));
  }

  const handleChange = (e: any) => {
    const selectedValue = e.target.value;
    const selectedClientId = getClientId(selectedValue);
    setSelectedClientName(selectedValue);
    apiDispatch({
      type: CONSTANTS.ACTIONS.SELECTED_CLIENT_NAME,
      data: {
        name: selectedValue,
        id: selectedClientId,
      },
    });
  };
  const handleReset = () => {
    setSelectedClientName("");
    apiDispatch({
      type: CONSTANTS.ACTIONS.SELECTED_CLIENT_NAME,
      data: {
        name: "",
        id: "",
      },
    });
  };

  const getClientId = (selectedName: string) => {
    const selectedClient = clientNames.find(
      (client: any) => client.name === selectedName
    );
    return selectedClient ? selectedClient.id : null;
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="client-select-label">Client First Name</InputLabel>
        <Select
          sx={{
            width: 250,
            height: 50,
          }}
          label="Client First Name"
          labelId="client-select-label"
          value={selectedClientName}
          onChange={handleChange}
          inputProps={{
            IconComponent: () => null,
          }}
          endAdornment={
            selectedClientName && (
              <InputAdornment position="end">
                <IconButton onClick={handleReset}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }
        >
          {clientNames &&
            clientNames.map((client: any) => (
              <MenuItem key={client.id} value={client.name}>
                {client.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
export default SearchDropDown;
