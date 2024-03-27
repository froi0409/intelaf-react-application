import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { CardAccountDetailsOutline, StorefrontOutline, MapMarkerOutline, Phone, ClockTimeThreeOutline, EmailOutline } from 'mdi-material-ui';
import Alert from '@mui/material/Alert';
import { editShippingTime } from 'src/utils/apiUtils/shipping-time/editShippingTimeUtil';

const EditShippingTime = () => {

    const [response, setResponse] = useState('');
    const [messageType, setMessageType] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [idStore1, setIdStore1] = useState('');
    const [idStore2, setIdStore2] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = {
            idStore1,
            idStore2,
            time
        }

        try {
            const res = await editShippingTime(formData);
            setSubmitted(true);

            if (res.status === 200) {
                setResponse('El tiempo entre tiendas ha sido actualizado con éxito');
                setMessageType('OK');
            } else if (res.status === 404) {
                setResponse('El tiempo entre las tiendas especificadas no existe (verifica que los códigos de tiendas sean correctos)');
                setMessageType('ERR');
            } else {
                setResponse('El tiempo entre tiendas no pudo ser actualizado');
            }

        } catch (error) {
            
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
            <CardHeader title='Editar Tiempo Entre Tiendas' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent sx={{ minHeight: 200, alignItems: 'center', justifyContent: 'center' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={5}>
                    <Grid item xs={12}>
                            <Grid container spacing={5}>
                                <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label='Código: Tienda de Origen'
                                    placeholder='STR-#'
                                    required
                                    value={idStore1}
                                    onChange={(e) => setIdStore1(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                            <CardAccountDetailsOutline />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label='Código: Tienda de Destino'
                                    placeholder='STR-#'
                                    required
                                    value={idStore2}
                                    onChange={(e) => setIdStore2(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                            <CardAccountDetailsOutline />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                </Grid> 
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type='number'
                            label='Tiempo'
                            placeholder='Ej: 12'
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
                                        Editar Tiempo
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
    );
}

export default EditShippingTime;
