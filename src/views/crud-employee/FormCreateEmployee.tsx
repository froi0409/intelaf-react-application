// ** React Imports
import { ChangeEvent, forwardRef, MouseEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import { Alert, IconButton, InputAdornment, OutlinedInput, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { AccountOutline, BadgeAccountOutline, EmailOutline, EyeOffOutline, EyeOutline, FormTextboxPassword, MapMarker, MapMarkerOutline, Numeric, PhoneOutline } from 'mdi-material-ui'
import { postCreateEmployeePath } from 'src/utils/apiUtils/employee/createEmployeeUtil'
import { getCookieJwt } from 'src/utils/cookieUtils'

interface StatePass {
  password: string
  showPassword: boolean
}

interface FormData {
  username: string;
  nit: string;
  name: string;
  phone: string;
  dpi: string;
  email: string;
  address: string;
  role: string;
  password: string;
}

const FormCreateEmployee = () => {
  /**HANDLE ERROR */
  const [messageType, setMessageType] = useState('')
  const [messageResponse, setMessageResponse] = useState('')
  const [submitted, setSubmitted] = useState(false);


  const [valuesPass, setValuesPass] = useState<StatePass>({
    password: '',
    showPassword: false
  })  

  const [values, setValues] = useState<FormData>({
    username: '',
    nit: '',
    name: '',
    phone: '',
    dpi: '',
    email: '',
    address: '',
    role: '',
    password: '',
  });

  const handleChange = (prop: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    setValues({ ...values, [prop]: event.target.value as string });
  };

  const handleClickShowPassword = () => {
    setValuesPass({ ...valuesPass, showPassword: !valuesPass.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleChangePass = (prop: keyof StatePass) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
    setValuesPass({ ...valuesPass, [prop]: event.target.value })
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setValues(prevState => ({
      ...prevState,
      [name as string]: value
    }));
  };

  const handlePost = async () => {
    const url = '/api/user/createEmployee/';
    try {
      setSubmitted(true);
      console.log('valores a enviar');
      console.log(values);
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getCookieJwt()
        },
        body: JSON.stringify(values),
      });

      if (respuesta.ok) {
        const datosRespuesta = await respuesta.json();
        console.log('Respuesta del servidor:', datosRespuesta);
        setMessageType('OK')    
        setMessageResponse('Empleado agregado con exito');
      } else {
        console.error('Error en la solicitud:', respuesta.statusText);
        setMessageType('ERR')    
        setMessageResponse('Empleado no agregado, Estado:' + respuesta.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
    console.log(values);
  };

  const handleSubmit = (e:any) => {    
    e.preventDefault();
    handlePost();
  };

  return (
    <Card>
      <CardHeader title='Ingreso de nuevo empleado a tienda' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid>
              {submitted && messageResponse != '' && (
                <div>
                    {messageType === 'OK' ? (
                        <Alert severity="success">{messageResponse}</Alert>
                    ) : (
                        <Alert severity="error">{messageResponse}</Alert>
                    )
                    }
                </div>
              )}
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Informacion del Empleado
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Codigo Empleado' placeholder='EM-1' value={values.username} onChange={handleChange('username')} InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BadgeAccountOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='NIT' placeholder='703022589' value={values.nit} onChange={handleChange('nit')} InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Numeric />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nombre' placeholder='Peter Zimbabwe' value={values.name} onChange={handleChange('name')} InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField type='number' fullWidth label='Telefono' value={values.phone} onChange={handleChange('phone')} placeholder='30303030' 
              InputProps={{ 
                inputProps: { min: 10000000, max: 99999999},
                startAdornment: (
                  <InputAdornment position='start'>
                    <PhoneOutline />
                  </InputAdornment>
                )
              }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type='number' fullWidth label='DPI' placeholder='1234567891234' value={values.dpi} onChange={handleChange('dpi')}
                InputProps={{ 
                  inputProps: { min: 1000000000000, max: 9999999999999},
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Numeric />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type='email' fullWidth label='Correo Electronico' placeholder='empleado1@gmail.com' value={values.email} onChange={handleChange('email')} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Direccion' placeholder='Calle A Z.12 Quetzaltenango' value={values.address} onChange={handleChange('address')} 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MapMarkerOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='role-select-label'>Rol</InputLabel>
                <Select
                  label='Rol'
                  defaultValue=''
                  labelId='role-select-label'
                  value={values.role}
                  name='role'
                  onChange={handleSelectChange}
                >
                  <MenuItem value='admin'>Administrador</MenuItem>
                  <MenuItem value='employee'>Empleado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                <OutlinedInput
                  label='Contrasena'
                  value={valuesPass.password}
                  id='form-layouts-basic-password'
                  onChange={handleChangePass('password')}                  
                  type={valuesPass.showPassword ? 'text' : 'password'}                  
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {valuesPass.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Agregar Empleado
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormCreateEmployee
