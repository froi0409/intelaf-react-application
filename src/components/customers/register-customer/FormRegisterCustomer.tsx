import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { CardContent, CardHeader, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { useState, MouseEvent } from 'react'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

export const FormRegisterCustomer = (props: any) => {
    const formData = props.formData;

    const [showPassword, setShowPassword] = useState(false);

    // Manejador de cambio genérico para actualizar los datos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        props.handleChange(name, value);
    };

    // Handle Password
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleFormRegistration = (e: any) => {
        e.preventDefault();
        console.log()

    }
    return (
        <Card  >
            <CardHeader title='Registro del cliente' titleTypographyProps={{ variant: 'h6' }} />
            <Divider sx={{ margin: 0 }} />
            <form onSubmit={handleFormRegistration} >
                <CardContent >
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6} >
                            <TextField fullWidth
                                label='NIT'
                                placeholder='12345678'
                                id="nit"
                                name='nit'
                                value={formData.nit}
                                onChange={handleChange}
                                inputProps={{ maxLength: 9 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField fullWidth
                                label='DPI'
                                placeholder='1234567890000'
                                id="dpi"
                                name='dpi'
                                value={formData.dpi}
                                onChange={handleChange}
                                inputProps={{ maxLength: 13 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <TextField fullWidth
                                label='UserName'
                                placeholder='Juan#000'
                                id="username"
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                inputProps={{ maxLength: 45 }}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <Divider sx={{ marginBottom: 0 }} />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField fullWidth
                                label='Nombre'
                                placeholder='Juan'
                                id="name"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField fullWidth
                                label='Email'
                                placeholder='Juan@email.com'
                                type="email"
                                id="email"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField fullWidth
                                label='Telefono'
                                placeholder='1234 9874'
                                id="phone"
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                inputProps={{ maxLength: 8 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <TextField fullWidth
                                label='Direccion'
                                placeholder='123 Cartagena'
                                id="address"
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor='password'>Contraseña</InputLabel>
                                <OutlinedInput
                                    label='Password'
                                    value={formData.password}
                                    id='password'
                                    name='password'
                                    onChange={handleChange}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                aria-label='toggle password visibility'
                                            >
                                                {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <TextField fullWidth
                                label='Credito inicial'
                                placeholder='0.0'
                                id="credit"
                                name='credit'
                                value={formData.credit}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </form>
        </Card>
    )
}
