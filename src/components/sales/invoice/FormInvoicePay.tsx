import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export const FormInvoicePay = () => {
    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedPayment(event.target.value);
      };

  return (
    <Card>
      <CardHeader
        title="Metodo de Pago"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={(e) => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="form-invoice-pay-select-label">
                  Tipo de pago
                </InputLabel>
                <Select
                  label="type_payment"
                  value={selectedPayment}
                  onChange={handlePaymentChange}
                  id="form-invoice-pay-select"
                  labelId="form-invoice-pay-select-label"
                  aria-describedby={selectedPayment === 'Credit' ? 'form-invoice-pay-select-helper' : undefined}
                >
                  <MenuItem value="Cash">Efectivo</MenuItem>
                  <MenuItem value="Credit">Credito</MenuItem>
                </Select>
              </FormControl>

                
              {selectedPayment === 'Credit' && (
                    <FormHelperText id="form-invoice-pay-select-helper">
                    Creditos disponibles: 
                    </FormHelperText>
                )}

            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="form-invoice-pay-amount">
                  Cantidad
                </InputLabel>
                <OutlinedInput
                  id="form-invoice-pay-amount"
                  startAdornment={
                    <InputAdornment position="start">Q.</InputAdornment>
                  }
                  label="Cantidad"
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};
