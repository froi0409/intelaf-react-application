import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { CardAccountDetailsOutline, StorefrontOutline, MapMarkerOutline, Phone, ClockTimeThreeOutline, EmailOutline } from 'mdi-material-ui';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import axios from 'axios';
import { createStore } from 'src/utils/apiUtils/store/createStoreUtil';



// Styled component for the form
const Form = styled('form')(({ theme }) => ({
    maxWidth: 400,
    padding: theme.spacing(12),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`
}))
const CreateStoreLayout = () => {

    const [response, setResponse] = useState('');
    const [messageType, setMessageType] = useState('')
    const [submitted, setSubmitted] = useState(false);

    const [storeCode, setStoreCode] = useState('');
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [storeEmail, setStoreEmail] = useState('');
    const [storePhone1, setStorePhone1] = useState('');
    const [storePhone2, setStorePhone2] = useState('');
    const [openingHour, setOpeningHour] = useState('');
    const [closingHour, setClosingHour] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            idStore: storeCode,
            name: storeName,
            address: storeAddress,
            phone1: storePhone1,
            phone2: storePhone2,
            email: storeEmail,
            openingHour: openingHour,
            closingHour: closingHour
        };
        
        try {
            const res = await createStore(formData);

            console.log(res);

            setSubmitted(true);

            if (res.status === 201) {
                setResponse('La tienda fue creada con éxito');
                setMessageType('OK')
            } else if (res.status === 400) {
                setResponse('El código ya está asociado a otra tienda, intenta con otro código');
                setMessageType('ERR')
            } else {
                setResponse('la tienda no pudo ser creada');
                setMessageType('ERR')
            }
        } catch (error) {
            setSubmitted(true);
            setMessageType('ERR')

            if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
                setResponse('El código ya está asociado a otra tienda, intenta con otro código');
            } else {
                setResponse('Ocurrió un error al enviar la solicitud');
            }
        }

    }

    return (
        <Card>
            <Grid>
                {submitted && response != '' && (
                    <div>
                        {messageType === 'OK' ? (
                            <Alert severity="success">{response}</Alert>
                        ) : (
                            <Alert severity="error">{response}</Alert>
                        )

                        }
                    </div>
                )}
            </Grid>
            <CardHeader title='Crear Tienda' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Código de la Tienda'
                            placeholder='STR-#'
                            required
                            value={storeCode}
                            onChange={(e) => setStoreCode(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <CardAccountDetailsOutline />
                                    </InputAdornment>
                                )
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Nombre de la Tienda'
                            placeholder='Ej: Interplaza Xela'
                            required
                            value={storeName}
                            onChange={(e) =>  setStoreName(e.target.value) }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <StorefrontOutline />
                                    </InputAdornment>
                                )
                            }}
                        />
                        </Grid> 
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Dirección de la Tienda'
                            placeholder='Ej: 14 avenida, zona 1, Centro Comercial Interplaza Xela, Local 25'
                            required
                            value={storeAddress}
                            onChange={(e) => { setStoreAddress(e.target.value) }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <MapMarkerOutline />
                                    </InputAdornment>
                                )
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type='email'
                            label='Correo Electrónico'
                            placeholder='carterleonard@gmail.com'
                            helperText='You can use letters, numbers & periods'
                            required
                            value={storeEmail}
                            onChange={(e) => { setStoreEmail(e.target.value) }}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                <EmailOutline />
                                </InputAdornment>
                            )
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type='number'
                            label='Teléfono 1'
                            placeholder='Ej: 55555555'
                            required
                            value={storePhone1}
                            onChange={(e) => { setStorePhone1(e.target.value) }}
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    max: 99999999
                                },
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <Phone />
                                    </InputAdornment>
                                )
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type='number'
                            label='Teléfono 2'
                            placeholder='Ej: 55555555'
                            value={storePhone2}
                            onChange={(e) => { setStorePhone2(e.target.value) }}
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    max: 99999999
                                },
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <Phone />
                                    </InputAdornment>
                                )
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={5}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    type='time'
                                    label='Horario Apertura'
                                    required
                                    value={openingHour}
                                    onChange={(e) => { setOpeningHour(e.target.value) }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                            <ClockTimeThreeOutline />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    type='time'
                                    label='Horario de Cierre'
                                    required
                                    value={closingHour}
                                    onChange={(e) => { setClosingHour(e.target.value) }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                            <ClockTimeThreeOutline />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                </Grid>    
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={5}>
                                <Grid item xs={2}>
                                    <Button type='submit' variant='contained' size='large' fullWidth>
                                        Crear Tienda
                                    </Button>
                                </Grid>
                                <Grid item xs={10}>
                                    
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
CreateStoreLayout.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default CreateStoreLayout

