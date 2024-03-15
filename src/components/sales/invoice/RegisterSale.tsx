import { Button, CardActions, CardContent } from "@mui/material";
import { Grid } from "mdi-material-ui";
import React, { Fragment } from "react";

export const RegisterSale = (props: any) => {

  const handleRegisterSale = (e: any) => {
    e.preventDefault();
    props.handleConfirmationRegisterSale();
  }

  const handleCancelSale = (e:any) => {
    e.preventDefault();
    props.handleCancelSale();
  }
  return (
    <Fragment>
      <Button onClick={handleRegisterSale} size="large" type="submit" sx={{ mr: 2 }} variant="contained">
        Registrar
      </Button>
      <Button onClick={handleCancelSale} size="large" color="secondary" variant="outlined">
        Cancelar
      </Button>
    </Fragment>
  );
};
