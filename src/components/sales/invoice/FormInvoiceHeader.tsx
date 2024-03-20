// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha de la factura' autoComplete='off' />
})

const FormInvoiceHeader = (props : any) => {
  const store = props.store
    // Use useEffect to set the date on component mount
    useEffect(() => {
        const currentDate = new Date();
        props.updateDate(currentDate);
    }, []);

  return (
    <Card>
      <CardHeader title={`TIENDA ${store}`} titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth disabled defaultValue="NOMBRE DEL EMPLEADO" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={props.getDate()}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-invoice-header-date'
                onChange={(date: Date) => props.updateDate(date)}
              />
            </Grid>
          </Grid>
        </CardContent>
    </Card>
  )
}

export default FormInvoiceHeader
