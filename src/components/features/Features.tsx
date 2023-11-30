import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Chip, Grid, Stack } from "@mui/material";

const featureList = [
  "View a list of clients and their accounts",
  "Filter clients by their first name",
  "Filter accounts by account type (e.g., VISA)",
  "Highlights accounts by balance (>= or < 0)",
  "Interactive pie chart for balance filtering",
  "Click on graphs to view client account details in a popup",
];

function Features() {
  return (
    <Box
      sx={{
        maxWidth: "auto",
        marginBottom: "30px",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Grid container spacing={1} style={{ textAlign: "center" }}>
        {featureList.map((feature, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Chip
              style={{ marginBottom: "10px", color: "#ec2971" }}
              label={feature}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Features;
