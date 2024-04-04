// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import FormUpdateProduct from 'src/views/crud-product/FormUpdateProduct' 

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import { getProductById } from 'src/utils/apiUtils/product/findProductByIdUtil'
import { getAllStores } from 'src/utils/apiUtils/store/allStoresUtil'
import Error404Edited from 'src/pages/404Edited'
import axios from 'axios'
import { Button, Card, Link, TextField, Typography } from '@mui/material'
import TableListBestSellingProducts from 'src/views/reports/TableListBestSellingProducts'
import { SearchBarProduct } from 'src/components/products/SearchBarProduct'
import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { getCookieJwt } from 'src/utils/helpers/cookieUtils'

//http://localhost:3000/pages/reports/best-selling-products/?date1=2024-01-01&date2=2024-01-02
//<TableListOrdersByIdCustomer orders={orders}/>
interface Product{
    id: string;
    name: string;
    manufacturer: string;
    price: number;
    description: string;
    guarantyMonths: number; 
    quantity:number; 
}



const BestSellingProducts = () => {  

  const [productsData, setProductsData] = useState([]);  
  const [products, setProducts] = useState([]);  

  const handleSearch = (searchValue: string | null) => {
    const findProduct = products.filter((product: Product) => {
      if (searchValue) {
        const lowerCaseSearchValue = searchValue.toLowerCase();
        return (
          product.id.toLowerCase().includes(lowerCaseSearchValue) ||
          product.name.toLowerCase().includes(lowerCaseSearchValue)          
        );
      } else {
        return true;
      }
    });    
    setProductsData(findProduct);
  };


  const fetchData = async () => {
    try {
      // Verifica que ambas fechas estén seleccionadas
      if (!startDate || !endDate) {
        console.error('Por favor, selecciona un rango de fechas');
        return;
      }
  
      // Formatea las fechas en el formato YYYY-MM-DD
      const formattedStartDate = startDate.toISOString().split('T')[0];
      const formattedEndDate = endDate.toISOString().split('T')[0];
  
      // Construye la URL con las fechas formateadas como parámetros
      const url = `http://localhost:8080/v1/reports/best-selling-products?date1=${formattedStartDate}&date2=${formattedEndDate}`;
  
      // Realiza la solicitud
      const response = await fetch(url, {
        headers: {
            Authorization: getCookieJwt()
        }
    });
  
      if (response.ok) {
        // Convierte la respuesta a formato JSON
        const productsD = await response.json();
        // Almacena los datos en el estado
        setProductsData(productsD);
        setProducts(productsD);
      } else {
        // Si la respuesta no es exitosa, muestra el mensaje de error
        console.error('Error al obtener los datos:', response.statusText);
      }
    } catch (error) {
      console.log(error);
      // Aquí puedes manejar el error si es necesario
    }
  };

  /*DATE*/
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Grid container spacing={6}>
    <Grid item xs={12} md={12} >
      <Typography variant='h5'>
        <Link target='_blank'>
          Seleccion de intervalo de Tiempo
        </Link>
      </Typography>
      <Typography variant='body2'>Seleccione el intervalo de tiempo en que requiere ver su listado</Typography>
      <br/>
      <DatePicker
          label="Seleccionar fecha de inicio"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="Seleccionar fecha de fin"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <br/>
        <br/>
      <Button variant="contained" color="primary" onClick={fetchData}>
            Obtener datos
          </Button>
    </Grid>
    <Grid item xs={12} md={4}>
      <Typography variant='h5'>
        <Link target='_blank'>
          Listado de los 10 productos mas vendidos
        </Link>
      </Typography>
      <Typography variant='body2'>Listado los diez productos mas vendidos entre un intervalo de tiempo</Typography>
      <Typography variant='body2'>Intervalo de tiempo entre: {startDate && endDate ? `${startDate.toLocaleDateString()} y ${endDate.toLocaleDateString()}` : 'Selecciona un rango de fechas'}</Typography>
    </Grid>
    <Grid item xs={12} md={8} >
        <SearchBarProduct handleSearch={handleSearch} />
    </Grid>
    <Grid item xs={12}>
      <Card>
        <TableListBestSellingProducts products={productsData} startDate={startDate} endDate={endDate}/>
      </Card>
    </Grid>
    </Grid>
    </LocalizationProvider>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
BestSellingProducts.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default BestSellingProducts
