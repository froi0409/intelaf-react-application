import React, { useEffect } from 'react'


// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useState } from 'react'
import { autocompleteFieldscustomer } from 'src/utils/apiUtils/sale/invoice/autocompleteCustomer'


export const FormOrderToSaleCustomer = (props: any) => {
    const nit = props.nit
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [fieldsDisabled, setFieldsDisabled] = useState(false); // Estado para habilitar/deshabilitar los campos
    useEffect(() => {
        handleVerificationNit();
    },[])
    const handleVerificationNit = async () => {
        try {
          const data = await autocompleteFieldscustomer(nit);
          setName(data.name);
          setAddress(data.address);
          setFieldsDisabled(true);
          props.getcredits(data.credit)
        } catch (err) {
          console.log('error to find customer by nit', err)
          setName('');
          setAddress('');
          setFieldsDisabled(false);
        }
      }
    return (
        <Card>
            <CardHeader title='Datos del comprador' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={e => e.preventDefault()}>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label='NIT' placeholder='CF / 12345678' value={nit} onBlur={handleVerificationNit} disabled={fieldsDisabled} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth type='text' label='Nombre' placeholder='Juan' value={name} disabled={fieldsDisabled} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth type='text' label='Direccion' placeholder='Ciudad' value={address} disabled={fieldsDisabled} />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider sx={{ margin: 0 }} />
            </form>
        </Card>
    )
}
