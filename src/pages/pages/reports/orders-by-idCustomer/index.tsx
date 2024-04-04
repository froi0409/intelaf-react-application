import {ReactNode, useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import { Card, Link, Typography, TextField, Button } from '@mui/material'
import TableListOrdersByIdCustomer from 'src/views/reports/TableListOrdersByIdCustomer'
import { useRouter } from 'next/router'
import { getCookieJwt } from 'src/utils/helpers/cookieUtils'

interface Payment {  
  type: string;
  amount: number;
}

interface Product {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}
  
interface OrderInterface {
  idOrder: number;
  idStoreShipping: string;
  idStoreReceive: string;
  dateDeparture: string;
  dateEntry: string;
  total: number;
  status: string;
  nit: string;
  products: Product[];
  payments: Payment[];
}

const ListSalesByIdCustomer: React.FC = () => {  

  const [idCustomer, setIdCustomer] = useState<string>('');
  const [orders, setOrders] = useState<OrderInterface[]>([]);  

  const fetchData = async () => {
    try {
      // Hacer la solicitud a la API con el id del cliente
      const response = await fetch(`http://localhost:8080/v1/reports/orders-by-idCustomer/${idCustomer}`, {
        headers: {
            Authorization: getCookieJwt()
        }
    });

      if (response.ok) {
        // Convertir la respuesta a formato JSON
        const data = await response.json();
        // Almacenar los datos en el estado
        setOrders(data);
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
            Listado de Ordenes en curso por codigo de usuario
          </Link>
        </Typography>
        <Typography variant='body2'>Listado de todas las ordenes en curso de un usuario</Typography>
      </Grid>
      <Grid item xs={12} md={6} >
      
      </Grid>
      <Grid item xs={12}>
        <Card>        
          <TableListOrdersByIdCustomer orders={orders} idCustomer={idCustomer}/>
        </Card>
      </Grid>
    </Grid>
  )
}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
ListSalesByIdCustomer.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default ListSalesByIdCustomer
