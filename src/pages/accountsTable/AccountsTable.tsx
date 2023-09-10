import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IClientAccounts, IClientDetails } from "../../interfaces/types";
import { useApiContext } from "../../contexts/apicontext";
import EmptyAccounts from "../../components/common/EmptyAccounts";
import { parseDate } from "../../utils/utilities";

interface AccountsTableProps {
  selectedClient: IClientDetails;
}

export default function AccountsTable({ selectedClient }: AccountsTableProps) {
  const { apiState } = useApiContext();
  const clientAccountsData =
    apiState.apiState.clientAccounts[selectedClient.id];

  return (
    <>
      {clientAccountsData.length ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientAccountsData.map((client: IClientAccounts) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.card_type}</TableCell>
                  <TableCell>{client.balance}</TableCell>
                  <TableCell>{parseDate(client.created)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <EmptyAccounts />
        </>
      )}
    </>
  );
}
