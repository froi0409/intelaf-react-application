import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { CardAccountDetailsOutline, StorefrontOutline, MapMarkerOutline, Phone, ClockTimeThreeOutline, EmailOutline } from 'mdi-material-ui';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import axios from 'axios';
import { addShippingTime } from 'src/utils/apiUtils/shipping-time/addShippingTimeUtil';




const AddShippingTimeLayout = () => {

    const [response, setResponse] = useState('');
    const [messageType, setMessageType] = useState('')
    const [submitted, setSubmitted] = useState(false);

    const [originStoreCode, setOriginStoreCode] = useState('');
    const [destinyStoreCode, setDestinyStoreCode] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            idStore1: originStoreCode,
            idStore2: destinyStoreCode,
            time: time
        }

        try {
            const res = await addShippingTime(formData);
            setSubmitted(true);

            if (res.status === 201) {
                setResponse('El tiempo entre tiendas fue agregado con éxito');
                setMessageType('OK');
            } else if (res.status === 404) {
                setResponse('Una (o ambas) tienda(s) no existe(n)');
                setMessageType('ERR');
            } else {
                setResponse('El tiempo entre tiendas no pudo ser creado');
                setMessageType('ERR');
            }

        } catch (error: any) {
            setSubmitted(true);
            setMessageType('ERR');
            setResponse('Ocurrió un error al intentar agregar un tiempo entre tiendas')
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
            <CardHeader title='Agregar Tiempo Entre Tiendas' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent sx={{ minHeight: 100, alignItems: 'center', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label='Código de la Tienda de Origen'
                            placeholder='STR-#'
                            required
                            value={originStoreCode}
                            onChange={(e) => setOriginStoreCode(e.target.value)}
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
                            label='Código de la Tienda de Destino'
                            placeholder='STR-#'
                            required
                            value={destinyStoreCode}
                            onChange={(e) =>  setDestinyStoreCode(e.target.value) }
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
                            type='number'
                            label='Tiempo (Días))'
                            placeholder='Ej: 5'
                            required
                            value={time}
                            onChange={(e) => { setTime(e.target.value) }}
                            InputProps={{
                                inputProps: {
                                    min: 0,
                                    max: 99999999
                                },
                                startAdornment: (
                                    <InputAdornment position='start'>
                                    <ClockTimeThreeOutline />
                                    </InputAdornment>
                                )
                            }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={5}>
                                <Grid item xs={2}>
                                    <Button type='submit' variant='contained' size='large' fullWidth>
                                        Agregar Tiempo
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
AddShippingTimeLayout.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default AddShippingTimeLayout;
