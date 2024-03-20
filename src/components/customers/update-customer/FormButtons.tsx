import { Button, CardActions, CardContent } from "@mui/material";
import { Grid } from "mdi-material-ui";
import React, { Fragment } from "react";

interface FormButtonsProps {
    handleConfirmationFormButtons: () => void; // Function to handle confirmation
    handleCancelFormButtons: () => void; // Function to handle confirmation
  }

export const FormButtons = (props: FormButtonsProps) => {

  const handleFormButtons = (e: any) => {
    e.preventDefault();
    props.handleConfirmationFormButtons();
  }

  const handleFormButtonsCancel = (e: any) => {
    e.preventDefault();
    props.handleCancelFormButtons();
  }

  return (
    <Fragment>
      <Button onClick={handleFormButtons} size="large" type="submit" sx={{ mr: 2 }} variant="contained">
        Realizar
      </Button>
      <Button onClick={handleFormButtonsCancel} size="large" color="secondary" variant="outlined">
        Cancelar
      </Button>
    </Fragment>
  );
};
