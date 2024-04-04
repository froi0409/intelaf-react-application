import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Grid, Button, TextField, InputAdornment } from '@mui/material';
import { CardAccountDetailsOutline, StorefrontOutline, MapMarkerOutline, Phone, ClockTimeThreeOutline, EmailOutline } from 'mdi-material-ui';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

import axios from 'axios';
import { useRouter } from 'next/router';
import { findStoreById } from 'src/utils/apiUtils/store/findStoreByIdUtil';
import { editStore } from 'src/utils/apiUtils/store/editStoreUtil';

const Form = styled('form')(({ theme }) => ({
    maxWidth: 400,
    padding: theme.spacing(12),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`
}))
const EditStoreLayout = () => { 

    const router = useRouter();
    const { idStore } = router.query;

    const [response, setResponse] = useState('');

    const [findMessageType, setFindMessageType] = useState('');
    const [findSubmitted, setFindSubmitted] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const [isDisabled, setIsDisabled] = useState(true)

    const [storeCode, setStoreCode] = useState(idStore);
    const [storeName, setStoreName] = useState('');
    const [storeAddress, setStoreAddress] = useState('');
    const [storeEmail, setStoreEmail] = useState('');
    const [storePhone1, setStorePhone1] = useState('');
    const [storePhone2, setStorePhone2] = useState('');
    const [openingHour, setOpeningHour] = useState('');
    const [closingHour, setClosingHour] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleEdit = async () => {
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
            const res = await editStore(formData);

            setSubmitted(true);
            setFindSubmitted(false);


            if (res.status === 200) {
                setMessageType('OK');
                setIsDisabled(true);
                setResponse(`Los datos de la tienda ${storeCode} fueron actualizados con éxito`)
            } else if (res.status === 404) {
                setResponse('No existe ninguna tienda con el código especificado');
            } else {
                setMessageType('ERR');
                setResponse('La tienda no pudo ser actualizada');
            }

        } catch (error) {
            setSubmitted(true);
            setFindSubmitted(false);

            if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
                setResponse('No existe ninguna tienda con el código especificado');
            } else {
                setResponse('Ocurrió un error al enviar al actualizar la tienda');
            }
        }

    }

    const handleSearch = async () => {
        try {
            const res = await findStoreById(idStore);

            setFindSubmitted(true);
            setSubmitted(false);

            if (res.status === 200) {
                setFindMessageType('OK');
                setStoreName(res.data.name);
                setStoreAddress(res.data.address);
                setStoreEmail(res.data.email);
                setStorePhone1(res.data.phone1);
                setIsDisabled(false);

                if (res.data.phone2 != null) {
                    setStorePhone2(res.data.phone2);
                } else {
                    setStorePhone2('');
                }

                if (res.data.openingHour != null) {
                    setOpeningHour(res.data.openingHour);
                } else {
                    setOpeningHour('');
                }

                if (res.data.closingHour != null) {
                    setClosingHour(res.data.closingHour);
                } else {
                    setClosingHour('');
                }
            } else if (res.status === 404) {
                setFindMessageType('ERR');
                setResponse('No existe ninguna tienda con el código especificado');
            } else {
                setResponse('No se pudo encontrar información de la tienda')
            }
        } catch (error) {
            setFindSubmitted(true);
            setSubmitted(false);
            setFindMessageType('ERR');

            clearInput();

            if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
                setResponse('No existe ninguna tienda con el código especificado');
            } else {
                setResponse('Ocurrió un error al enviar la solicitud');
            }
        }
    }

    const clearInput = () => {
        //setStoreCode('');
        setStoreName('');
        setStoreAddress('');
        setStoreEmail('');
        setStorePhone1('');
        setStorePhone2('');
        setOpeningHour('');
        setClosingHour('');
    }

    return (
        <Card>
            <Grid>
                {findSubmitted && response != '' && (
                    <div>
                        {findMessageType === 'ERR' && (
                            <Alert severity="error">{response}</Alert>
                        )
                        }
                    </div>
                )
                }
                {submitted && response != '' && (
                    <div>
                        {
                            messageType === 'OK' ? (
                                <Alert severity="success">{response}</Alert>
                            ) : (
                                <Alert severity="error">{response}</Alert>
                            )
                        }
                    </div>
                )

                }
            </Grid>
            <CardHeader title='Editar Tienda' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <form>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <Grid container spacing={5} alignItems='center'>
                                <Grid item xs={10}>
                                <TextField
                                    disabled={!isDisabled}
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
                                <Grid item xs={2}>
                                    <Button disabled={!isDisabled} onClick={handleSearch} variant='contained' size='large' fullWidth>
                                        Buscar Tienda
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            disabled={isDisabled}
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
                            disabled={isDisabled}
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
                            disabled={isDisabled}
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
                            disabled={isDisabled}
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
                            disabled={isDisabled}
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
                                    disabled={isDisabled}
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
                                    disabled={isDisabled}
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
                                    <Button type="button" onClick={handleEdit} variant='contained' size='large' fullWidth>
                                        Editar Tienda
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
EditStoreLayout.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default EditStoreLayout
