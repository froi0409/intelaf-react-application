// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import TableListProducts from 'src/views/crud-product/TableListProducts'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Card, CardHeader, Link, TextField, Typography } from '@mui/material'
import { getAllProducts } from 'src/utils/apiUtils/product/allProductsUtil'
import { SearchBarProduct } from 'src/components/products/SearchBarProduct'
import { SearchBarSale } from 'src/components/reports/sales-by-idCustomer/SearchBarSale'
import TableListSalesByIdCustomer from 'src/views/reports/TableListSalesByIdCustomer'
import { useRouter } from 'next/router'
import { getCookieJwt } from 'src/utils/helpers/cookieUtils'

  
interface Product {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

interface Payment {
  idPayment: number;
  type: string;
  amount: number;
}

interface Sale {
  idSale: number;
  date: string;
  total: number;
  idCustomer: number;
  products: Product[];
  payments: Payment[];
}


//<SearchBarSale handleSearch={handleSearch} />
//<TableListSalesByIdCustomer />
const ListSalesByIdCustomer: React.FC = () => {
  const [idCustomer, setIdCustomer] = useState<string>('');

  const [sales, setSales] = useState<Sale[]>([]);  

  const fetchData = async () => {
    try {
      // Hacer la solicitud a la API con el id del cliente
      const response = await fetch(`http://localhost:8080/v1/reports/sales-by-idCustomer/${idCustomer}`, {
        headers: {
            Authorization: getCookieJwt()
        }
    });

      if (response.ok) {
        // Convertir la respuesta a formato JSON
        const data = await response.json();
        // Almacenar los datos en el estado
        setSales(data);
      } else {
        // Si la respuesta no es exitosa, mostrar el mensaje de error
        console.error('Error al obtener los datos:', response.statusText);
      }
    } catch (error) {
      console.log(error);
      // Manejar errores
    }
  };

  const handleFetchData = () => {
    // Realizar la solicitud al servidor al hacer clic en el botón
    fetchData();
  };
  

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Typography variant='h5'>
          <Link target='_blank'>
            Seleccion de Consumidor 
          </Link>
        </Typography>
        <Typography variant='body2'>Ingrese el codigo del usuario sobre el que desea hacer el listado</Typography>
        <br/>
        <TextField
          label="ID de Cliente"
          value={idCustomer}
          onChange={(e) => setIdCustomer(e.target.value)}
        />
        <br/>
        <br/>
        <Button variant="contained" color="primary" onClick={handleFetchData}>
          Obtener datos
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant='h5'>
          <Link target='_blank'>
            Listado de todas las compras realizadas por un usuario
          </Link>
        </Typography>
        <Typography variant='body2'>Listado de todas las compras realizadas por un usuario</Typography>
      </Grid>
      <Grid item xs={12} md={6} >
      
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableListSalesByIdCustomer sales={sales} idCustomer={idCustomer}/>
        </Card>
      </Grid>
    </Grid>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
ListSalesByIdCustomer.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ListSalesByIdCustomer
