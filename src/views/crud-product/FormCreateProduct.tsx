// ** React Imports
import { ChangeEvent, ElementType, forwardRef, MouseEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button, { ButtonProps } from '@mui/material/Button'
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
import { Alert, InputAdornment, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { AccountHardHat, BadgeAccountOutline, Box, Cash, LabelOutline, Numeric, PencilOutline, ShieldLockOutline, Text } from 'mdi-material-ui'
import React from 'react'
import { postCreateProduct } from 'src/utils/apiUtils/product/createProductUtil'
//import {createProductHandler} from '../../api/product/createProduct'

import { styled } from '@mui/material/styles'
import axios from 'axios'
import { getCookieJwt } from 'src/utils/cookieUtils'


interface StoreInfo {
  storeCode: string;
  stock: number;
}

interface Store {
  idStore: string;
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  storeHours: string | null;
}

interface Props {
  stores: Store[];
}

interface Product{
  idProduct: string;
  name: string;
  manufacturer: string;
  price: number;
  description: string;
  guarantyMonths: number;
  stores:StoreInfo[];  
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const FormCreateProduct:React.FC<Props> = ({ stores }) => {
  // ** States
  const [storeInfo, setStoreInfo] = useState<StoreInfo[]>([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [quantity, setQuantity] = useState('');

  const [messageType, setMessageType] = useState('')
  const [messageResponse, setMessageResponse] = useState('')
  const [submitted, setSubmitted] = useState(false);

  // ** Image uploadre settings
  const [imgSrc, setImgSrc] = useState<string>('/images/imagotipo.png')
  const [imgUpload, setImgUpload] = useState<File | null>(null);


  const [values, setValues] = useState<Product>({
    idProduct: '',
    name: '',
    manufacturer: '',
    price: 0,
    description: '',
    guarantyMonths: 0,
    stores:storeInfo
  });

  const handleChange = (prop: keyof Product) => (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    setValues({ ...values, [prop]: event.target.value as string });
  };


  //Handle Store Info
  const handleAddStoreInfo = () => {
    if (selectedStore && quantity) {
      // Verify the existence of the store in the storeInfo
      const isStoreExists = storeInfo.some(info => info.storeCode === selectedStore);      
      if (!isStoreExists) {
        const newStoreInfo: StoreInfo[] = [...storeInfo, { storeCode: selectedStore, stock: parseInt(quantity) }];
        setStoreInfo(newStoreInfo);
        setValues({ ...values, stores: newStoreInfo });
        setSelectedStore('');
        setQuantity('');
        
      } else {
        alert('¡La tienda ya ha sido agregada!');        
      }
    }
  };

  const handleQuantityChange = (index:any, newQuantity:any) => {
    const updatedStoreInfo = [...storeInfo];
    updatedStoreInfo[index].stock = parseInt(newQuantity);
    if (parseInt(newQuantity) === 0) {
      // If quantity is 0 delete from the table
      updatedStoreInfo.splice(index, 1);
    }
    setStoreInfo(updatedStoreInfo);
  };

  const handlePost = async () => {
    setSubmitted(true);
    let isOk = true;
    try {
      const productData = await postCreateProduct(values);  
      setMessageType('OK')    
      setMessageResponse('Producto agregado con exito');
    } catch (error) {
      isOk = false;
      console.log(error);      
      setMessageType('ERR')    
      setMessageResponse('Producto no agregado ya existe un producto con Codigo: '+ values.idProduct);
    }finally {
      console.log(values);      
      if(isOk){
        handlePostImage();      
      }
    }    
    
  };

  const handlePostImage = async () => {    
    const formData = new FormData();
    console.log("asdfasdfasfdasfsafsa")
    if (imgUpload) {
      formData.append('image', imgUpload);
      formData.append('idProduct', values.idProduct);
      try {
        await axios.post(`http://localhost:8080/v1/images/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: getCookieJwt()
          }
        });
        //alert('Image uploaded successfully');
      } catch (error) {
        //alert('Failed to upload image');
      }
    }
  };

  const handleSubmit = (e:any) => {    
    e.preventDefault();
    handlePost();
  };

  const handleImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      setImgUpload(files[0]);
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <Card>
      <CardHeader title='Ingreso de nuevo producto a tiendas' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
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
                1. Informacion del producto
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Codigo' placeholder='PR-1' value={values.idProduct} onChange={handleChange('idProduct')} InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LabelOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nombre' placeholder='Jabon' value={values.name} onChange={handleChange('name')} InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PencilOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Fabricante' placeholder='Zote' value={values.manufacturer} onChange={handleChange('manufacturer')} InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountHardHat />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Descripcion' placeholder='Descripcion del producto' value={values.description} onChange={handleChange('description')} InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Text />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type='number' fullWidth label='Garantia' placeholder='12' value={values.guarantyMonths} onChange={handleChange('guarantyMonths')} InputProps={{ 
                inputProps: { min: 0},                
                startAdornment: (
                  <InputAdornment position='start'>
                    <ShieldLockOutline />
                  </InputAdornment>
                )                
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type='number' fullWidth label='Precio' placeholder='10.00' value={values.price} onChange={handleChange('price')} InputProps={{ 
                inputProps: { step:"any",min: 0.00},                
                startAdornment: (
                  <InputAdornment position='start'>
                    <Cash /> 
                  </InputAdornment>
                )                
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                2. Extras del producto
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>        
              <Typography variant='body1' sx={{ marginTop: 5 }}>
                Subir imagen del producto
              </Typography>        
              <ImgStyled src={imgSrc} alt='Profile Pic' />                
              <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                Subir foto
                <input
                  hidden
                  type='file'
                  onChange={handleImageChange}
                  accept='image/png, image/jpeg'
                  id='account-settings-upload-image'
                />
              </ButtonStyled>
              <Typography variant='body2' sx={{ marginTop: 5 }}>
                Tipo aceptado: PNG or JPEG. Max 800K.
              </Typography>                
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                3. Informacion de las tiendas
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='store-select-label'>Tienda</InputLabel>
                <Select
                  label='Tienda'
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  labelId='store-select-label'
                >
                  {stores.map((store, index) => (
                    <MenuItem key={index} value={store.idStore}>
                      {store.idStore},
                      {store.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type='number' fullWidth label='Cantidad' placeholder='5' 
                InputProps={{ 
                  inputProps: { min: 0},                  
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Numeric /> 
                    </InputAdornment>
                  )                  
                }} 
                value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
            </Grid>
            <Grid item xs={12}>
              <Button size='medium' sx={{ mr: 2 }} variant='contained' onClick={handleAddStoreInfo}>
                Agregar Cantidad y Tienda
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tienda</TableCell>
                      <TableCell>Cantidad</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {storeInfo.map((info, index) => (
                      <TableRow key={index}>
                        <TableCell>{info.storeCode}</TableCell>
                        <TableCell>
                          <TextField
                            type='number'
                            value={info.stock}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                            InputProps={{ inputProps: { min: 0 } }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleSubmit}>
            Agregar Producto
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormCreateProduct
