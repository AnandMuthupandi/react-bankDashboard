import React from "react";
import assets from "../../assets";
import styles from "../../styles/styles.module.css";

export const Dashboard = () => {
  return (
    <div className={styles.imageContainer}>
      <img
        src={assets.images.underConstruction}
        className={styles.imageLayout}
        alt="inprogress"
      />
    </div>
  );
};

export default Dashboard;
