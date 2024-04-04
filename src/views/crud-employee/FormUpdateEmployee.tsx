// ** React Imports
import React, { useEffect } from 'react';
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
import { Alert, IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { AccountOutline, BadgeAccountOutline, EmailOutline, EyeOffOutline, EyeOutline, FormTextboxPassword, MapMarker, MapMarkerOutline, Numeric, PhoneOutline } from 'mdi-material-ui'
import { putUpdateEmployee } from 'src/utils/apiUtils/employee/updateEmployeeUtil';


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

interface FormUpdateEmployeeProps {
  employee: FormData;
}

const FormUpdateEmployee : React.FC<FormUpdateEmployeeProps> = ({ employee }) => {

  const [messageType, setMessageType] = useState('')
  const [messageResponse, setMessageResponse] = useState('')
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { username, nit, name, phone, dpi, email, address, password, role } = employee; 
        setValues({ 
          ...values, 
          username: username,
          nit: nit,
          name: name,
          phone: phone,
          dpi: dpi,
          email: email,
          address: address,
          password: '',
          role: role 
        });
        setValuesPass({ ...valuesPass, password: '' });
      } catch (error) {
        console.log(error);
        // Aquí puedes manejar el error si es necesario
      }
    };

    if (employee) {
      fetchData();
    }
  }, [employee]);

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

  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {    
    console.log(event.target.value)
    setValues({ ...values, role: event.target.value as string });
  };

  const handlePut = async () => {
    try {
      const employeeData = await putUpdateEmployee(values);     
      setSubmitted(true);
      if(employeeData instanceof Error){
        setMessageType('ERR')
        setMessageResponse(employeeData.message);
      }else{
        setMessageType('OK')
        setMessageResponse('Empleado Actualizado con exito');
      } 
    } catch (error) {
      console.log(error);
      // Aquí puedes manejar el error si es necesario
    }
    console.log(values);
  };

  const handleSubmit = (e:any) => {
    console.log('valores sumit');
    e.preventDefault();
    handlePut();
  };

  return (
    <Card>
      <CardHeader title='Actualizacion de empleado' titleTypographyProps={{ variant: 'h6' }} />
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
              <TextField fullWidth label='Codigo Empleado' placeholder='EM-1' value={values.username} onChange={handleChange('username')} disabled={true} InputProps={{
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
                  onChange={handleRoleChange}
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

export default FormUpdateEmployee
