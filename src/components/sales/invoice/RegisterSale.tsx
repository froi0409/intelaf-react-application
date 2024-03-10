import { Button, CardActions, CardContent } from "@mui/material";
import { Grid } from "mdi-material-ui";
import React from "react";

export const RegisterSale = (props: any) => {

  const handleRegisterSale = (e: any) => {
    e.preventDefault();
    props.handleConfirmationRegisterSale();
  }
  return (
    <form onSubmit={handleRegisterSale}>
      <Button size="large" type="submit" sx={{ mr: 2 }} variant="contained">
        Registrar
      </Button>
      <Button size="large" color="secondary" variant="outlined">
        Cancelar
      </Button>
    </form>
  );
};
