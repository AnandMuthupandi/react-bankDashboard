import React from "react";
import assets from "../../assets";
import styles from "../../styles/styles.module.css";
import { Typography } from "@mui/material";

function EmptyAccounts() {
  return (
    <div className={styles.imageContainer}>
      <span>
        <img
          src={assets.images.zeroAccount}
          style={{
            width: 400,
            height: 200,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          alt="zeroAccount"
        />
        <Typography>
          This client currently does not have any existing accounts.
        </Typography>
      </span>
    </div>
  );
}

export default EmptyAccounts;
