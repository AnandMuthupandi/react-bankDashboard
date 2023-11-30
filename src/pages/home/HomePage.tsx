import { Box, Container, Grid } from "@mui/material";
import React from "react";
import styles from "../../styles/styles.module.css";
import Features from "../../components/features/Features";
import assets from "../../assets";

const stackImages = [
  { src: assets.images.react, alt: "react" },
  { src: assets.images.typeScript, alt: "ts" },
  { src: assets.images.d3js, alt: "d3" },
  { src: assets.images.jest, alt: "jest" },
  { src: assets.images.mui, alt: "mui" },
];

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
          {stackImages.map((stack, index) => (
            <Grid item key={index} xs={2}>
              <img src={stack.src} className={styles.stack} alt={stack.alt} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;
