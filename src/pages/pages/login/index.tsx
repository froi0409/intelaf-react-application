// ** React Imports
import React, { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import { login } from 'src/utils/apiUtils/auth/loginUtil'

import jwt_decode from "jwt-decode";
import { Grid } from '@mui/material'
import Alert from '@mui/material/Alert';
import { setCookie } from 'cookies-next';
import { getStoreByIdLogin } from 'src/utils/apiUtils/store/findStoreByIdLoginUtil'
import { verifySystemData } from 'src/utils/apiUtils/data-file/verifySystemDataUtil'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State 
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })

  const [username, setUsername] = useState('')
  const [storeId, setStoreId] = useState('')
  const [formMessage, setFormMessage] = useState('');
  const [isEmployee, setIsEmployee] = useState(false);
  const [jwt, setJwt] = useState('');

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await verifySystemData();
        const missedData = res.data;

        if (res.status === 200) {
          console.log(missedData);
          if (missedData.length > 0) {
            setFormMessage(`Hace falta información en el sistema: ${missedData} favor de informar a un administrador.`);
          }
        }

      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEmployee) {
      const formData = {
        username: username,
        password: values.password
      }

      try {
        const res = await login(formData);
        console.log(res);

        if (res.status === 200) {
          
          setJwt(res.data.token);
          const role = res.data.role;


          if (role === 'ADMINISTRATOR') {
            router.push('/verify-system/upload-datafile/');
          } else if (role === 'EMPLOYEE') {
            setIsEmployee(true);
          } else { // CUSTOMER
            router.push('/pages/customer/dashboard');
          }
          

        } else if (res.status === 404) {
          setFormMessage('Usuario o contraseña incorrecta, intenta de nuevo');
        }

      } catch (error: any) {
        console.error(error);
      }
    } else {

      try {
        
        const res = await getStoreByIdLogin(storeId);

        if (res.status === 200) {
          setCookie('idStore', storeId);
          router.push('/pages/product/create-product');
        } else {
          setFormMessage('El código de la tienda ingresada no existe');
        }

      } catch (error: any) {
        console.error(error);
        setFormMessage('El código de la tienda ingresada no existe');
      }

    }

  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <Grid>
          {formMessage != '' && (
            <Alert severity="error">{formMessage}</Alert>
          )
          }
        </Grid>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bienvenido a {themeConfig.templateName}!
            </Typography>
            <Typography variant='body2'>Ingresa tus credenciales para iniciar sesión</Typography>
          </Box>
          <form noValidate onSubmit={handleSubmit} autoComplete='off'>
            <TextField
              disabled={isEmployee}
              autoFocus 
              fullWidth 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id='username' 
              label='Usuario' 
              sx={{ marginBottom: 4 }} 
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
              <OutlinedInput
                disabled={isEmployee}
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                sx={{ marginBottom: 4 }}
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
              <Grid>
                {isEmployee && (
                  <FormControl fullWidth>
                      <TextField
                      autoFocus 
                      fullWidth 
                      value={storeId}
                      onChange={(e) => setStoreId(e.target.value)}
                      id='store' 
                      label='Código de Tienda' 
                      sx={{ marginBottom: 4 }} 
                    />
                  </FormControl>
                )

                }
              </Grid>
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
            </Box>
            <Button
              fullWidth
              type='submit'
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
            >
              Iniciar Sesión
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                ¿Eres nuevo?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Crear una cuenta</LinkStyled>
                </Link>
              </Typography>
            </Box>
            
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
