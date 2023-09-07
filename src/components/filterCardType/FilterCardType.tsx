import React, { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IClientAccounts } from "../../interfaces/types";
import { colorMapping } from "../../utils/utilities";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "../../styles/styles.module.css";

const theme = createTheme({});

export default function FilterCardType({ clientAccounts, filteredCards }: any) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (accountId: string) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [accountId]: !prevCheckedItems[accountId],
    }));
  };

  useEffect(() => {
    filteredCards(checkedItems);
  }, [checkedItems]);

  return (
    <>
      {clientAccounts.length && (
        <>
          <ThemeProvider theme={theme}>
            <FormGroup
              sx={{
                position: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {clientAccounts.map((account: IClientAccounts) => (
                <FormControlLabel
                  key={account.id}
                  control={
                    <Checkbox
                      defaultChecked
                      id={account.id}
                      size="small"
                      sx={{
                        [`&, &.${checkboxClasses.checked}`]: {
                          color: colorMapping(account.card_type),
                        },
                        fontSize: 10,
                        padding: 0,
                      }}
                      onChange={() => handleCheckboxChange(account.id)}
                    />
                  }
                  label={
                    <Typography className={styles.formControlLabel}>
                      {account.card_type}
                    </Typography>
                  }
                  className={styles.formControlLabel}
                />
              ))}
            </FormGroup>
          </ThemeProvider>
        </>
      )}
    </>
  );
}
