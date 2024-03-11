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
import { InputAdornment, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { AccountHardHat, BadgeAccountOutline, Cash, LabelOutline, Numeric, PencilOutline, ShieldLockOutline, Text } from 'mdi-material-ui'
//import {createProductHandler} from '../../api/product/createProduct'


interface StoreInfo {
    store: string;
    quantity: number;
}

const FormCreateProduct = () => {
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

  const handleCreateProduct = async () => {
    try {
      const response = await fetch('/api/product/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idProduct: 'PR-103',
          name: 'JABON ZOT3',
          manufacturer: 'ZOT3',
          price: 53,
          description: 'En un gran jabon 3',
          guarantyMonths: 13,
          stores: [
            { storeCode: 'STR-3', stock: 23 },
            { storeCode: 'STR-1', stock: 3 },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error creating the product: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader title='Ingreso de nuevo producto a tiendas' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Informacion del producto
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Codigo' placeholder='PR-1' InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LabelOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Nombre' placeholder='Jabon' InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PencilOutline />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Fabricante' placeholder='Zote' InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountHardHat />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label='Descripcion' placeholder='Descripcion del producto' InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Text />
                    </InputAdornment>
                  )
                }}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type='number' fullWidth label='Garantia' placeholder='12' InputProps={{ 
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
              <TextField type='number' fullWidth label='Precio' placeholder='10.00' InputProps={{ 
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
                2. Informacion de las tiendas
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
                  <MenuItem value='UK'>UK</MenuItem>
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
                        <TableCell>{info.store}</TableCell>
                        <TableCell>
                          <TextField
                            type='number'
                            value={info.quantity}
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
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleCreateProduct}>
            Agregar Producto
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormCreateProduct
