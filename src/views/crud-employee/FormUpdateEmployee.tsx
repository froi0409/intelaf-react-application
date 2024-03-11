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
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { AccountOutline, BadgeAccountOutline, EmailOutline, EyeOffOutline, EyeOutline, FormTextboxPassword, MapMarker, MapMarkerOutline, Numeric, PhoneOutline } from 'mdi-material-ui'


interface StoreInfo {
    store: string;
    quantity: number;
}

interface StatePass {
  password: string
  showPassword: boolean
}

const FormCreateEmployee = () => {
  // ** States
  const [storeInfo, setStoreInfo] = useState<StoreInfo[]>([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [quantity, setQuantity] = useState('');


  //Handle Store Info
  const handleAddStoreInfo = () => {
    if (selectedStore && quantity) {
      // Verify the existence of the store in the storeInfo
      const isStoreExists = storeInfo.some(info => info.store === selectedStore);
      if (!isStoreExists) {
        const newStoreInfo: StoreInfo[] = [...storeInfo, { store: selectedStore, quantity: parseInt(quantity) }];
        setStoreInfo(newStoreInfo);
        setSelectedStore('');
        setQuantity('');
      } else {
        alert('¡La tienda ya ha sido agregada!');
      }
    }
  };

  const handleQuantityChange = (index:any, newQuantity:any) => {
    const updatedStoreInfo = [...storeInfo];
    updatedStoreInfo[index].quantity = parseInt(newQuantity);
    if (parseInt(newQuantity) === 0) {
      // If quantity is 0 delete from the table
      updatedStoreInfo.splice(index, 1);
    }
    setStoreInfo(updatedStoreInfo);
  };

  const [values, setValues] = useState<StatePass>({
    password: '',
    showPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleChange = (prop: keyof StatePass) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <Card>
      <CardHeader title='Ingreso de nuevo empleado a tienda' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                Informacion del Empleado
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Codigo Empleado' placeholder='EM-1' InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BadgeAccountOutline />
                    </InputAdornment>
                  )
                }} disabled={true}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='NIT' placeholder='703022589' InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Numeric />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nombre' placeholder='Peter Zimbabwe' InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField type='number' fullWidth label='Telefono' placeholder='30303030' 
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
              <TextField type='number' fullWidth label='DPI' placeholder='1234567891234' 
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
              <TextField type='email' fullWidth label='Correo Electronico' placeholder='empleado1@gmail.com' InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Direccion' placeholder='Calle A Z.12 Quetzaltenango' InputProps={{
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
                  value={values.password}
                  id='form-layouts-basic-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}                  
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
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
