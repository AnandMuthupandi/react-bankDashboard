import React from "react";
import styles from "../../../styles/styles.module.css";
import Stack from "@mui/joy/Stack";
import LinearProgress from "@mui/joy/LinearProgress";

function PageLoader() {
  return (
    <Stack
      spacing={2}
      sx={{ flex: 1 }}
      className={styles.pageLoader}
      data-testid="loading"
    >
      <LinearProgress color="primary" variant="soft" />
      <LinearProgress color="neutral" variant="soft" />
      <LinearProgress color="danger" variant="soft" />
      <LinearProgress color="success" variant="soft" />
      <LinearProgress color="warning" variant="soft" />
    </Stack>
  );
}

export default PageLoader;
