import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useApiContext } from "../../contexts/apicontext";
import { clientDetailsMapping } from "./ClientDetailsMapping";
import { IClientDetails } from "../../interfaces/types";

export default function ClientDetails(props: any) {
  const { apiState } = useApiContext();

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
                  <Typography variant="h6" gutterBottom>
                    Client ID : {client.id}
                  </Typography>

                  {clientDetailsMapping(client).map((data, index) => (
                    <React.Fragment key={index}>
                      <Typography color="text.secondary">
                        {data.label}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} variant="subtitle2">
                        {data.value}
                      </Typography>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button>More</Button>
            </CardActions>
          </Card>
          <br></br>
        </React.Fragment>
      ))}
    </>
  );
}
