import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export const FormInvoicePay = (props: any) => {

  const credit = props.credits;
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handlePaymentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedPayment(event.target.value as string);
  };

  // Maneja el cambio en la cantidad de pago
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(event.target.value as unknown as number);
  };

  // Agrega un nuevo método de pago al estado
  const addPayment = () => {
    // Verifica si se ha seleccionado un tipo de pago y se ha ingresado una cantidad
    if (props.addPayment(selectedPayment, paymentAmount)) {
      setSelectedPayment('');
      setPaymentAmount(0);
    }
  };

  return (
    <Card>
      <CardHeader
        title="Metodo de Pago"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="form-invoice-pay-select-label">Tipo de pago</InputLabel>
              <Select
                label="type_payment"
                value={selectedPayment}
                onChange={handlePaymentChange}
                id="form-invoice-pay-select"
                labelId="form-invoice-pay-select-label"
              >
                <MenuItem value="Cash">Efectivo</MenuItem>
                <MenuItem value="Credit">Credito</MenuItem>
              </Select>
            </FormControl>
            {selectedPayment === 'Credit' && (
              <FormHelperText id="form-invoice-pay-select-helper">
                Creditos disponibles: {credit}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="form-invoice-pay-amount">Cantidad</InputLabel>
              <OutlinedInput
                id="form-invoice-pay-amount"
                value={paymentAmount}
                onChange={handleAmountChange}
                startAdornment={<InputAdornment position="start">Q.</InputAdornment>}
                label="Cantidad"
              />
            </FormControl>
          </Grid>
        </Grid>
        { props.stillPay > 0 && <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Falta por pagar:</InputLabel>
              <Input
                id="standard-adornment-amount"
                disabled
                value={props.stillPay}
                startAdornment={<InputAdornment position="start">Q.</InputAdornment>}
              />
            </FormControl>
            {props.minimumPay !== undefined && (
              <FormHelperText id="form-invoice-pay-adornment-helper">
                Minimo por pagar : Q.{props.minimumPay}
              </FormHelperText>
            )}
          </Grid>
        </Grid>}

      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={addPayment}>
          Agregar pago
        </Button>
      </CardActions>
    </Card>
  );
};
