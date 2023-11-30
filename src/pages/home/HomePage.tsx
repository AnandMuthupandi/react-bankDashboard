import { Avatar, Box, Card, CardContent, Container, Grid } from "@mui/material";
import React from "react";
import styles from "../../styles/styles.module.css";
import Features from "../../components/features/Features";
import assets from "../../assets";

function HomePage() {
  return (
    <Container>
      <header className={styles.homeHeader}>
        <h1>Thank you for visiting my site</h1>
      </header>
      <h2>
        A web application for checking registered clients and their banking
        accounts. This project displays clients and their accounts as a
        scrollable page with various filtering options. The data is fetched from
        a RESTful API.
      </h2>

      <Features />

      <Box style={{ textAlign: "end" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={2}>
            <img
              src={assets.images.react}
              className={styles.stack}
              alt="react"
            />
          </Grid>
          <Grid item xs={2}>
            <img
              src={assets.images.typeScript}
              className={styles.stack}
              alt="ts"
            />
          </Grid>
          <Grid item xs={2}>
            <img src={assets.images.d3js} className={styles.stack} alt="d3" />
          </Grid>
          <Grid item xs={2}>
            <img src={assets.images.jest} className={styles.stack} alt="jest" />
          </Grid>
          <Grid item xs={2}>
            <img src={assets.images.mui} className={styles.stack} alt="mui" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;
