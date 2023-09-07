import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useApiContext } from "../../contexts/apicontext";
import { clientDetailsMapping } from "./ClientDetailsMapping";
import Charts from "../../components/common/Charts";
import AccountsTable from "../accountsTable/AccountsTable";
import { IClient, IClientDetails } from "../../interfaces/types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ClientDetails(props: any) {
  const { apiState } = useApiContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClientDetails | null>(
    null
  );

  const openModal = (client: IClientDetails) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setIsModalOpen(false);
  };

  const clientInfo = () => {
    if (apiState.selectedClient && apiState.selectedClient.name) {
      return props.clientData.filter(
        (item: IClientDetails) =>
          item.firstname === apiState.selectedClient.name
      );
    }
    return props.clientData;
  };

  return (
    <>
      {clientInfo().map((client: IClientDetails) => (
        <React.Fragment key={client.id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Client ID : {client.id}
                  </Typography>

                  {clientDetailsMapping(client).map((data: IClient) => (
                    <React.Fragment key={data.label}>
                      <Typography color="text.secondary">
                        {data.label}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} variant="subtitle2">
                        {data.value}
                      </Typography>
                    </React.Fragment>
                  ))}
                </Grid>
                <Charts
                  clientId={client.id}
                  openModal={() => openModal(client)}
                />
              </Grid>
            </CardContent>
            <CardActions>
              <Button onClick={() => openModal(client)}>More</Button>
            </CardActions>
          </Card>
          <br></br>
        </React.Fragment>
      ))}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={style}>
          {selectedClient && <AccountsTable selectedClient={selectedClient} />}
        </Box>
      </Modal>
    </>
  );
}
