// ** React Imports
import {ReactNode, useEffect, useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Card, CardHeader, Link, Typography } from '@mui/material'
import TableListSalesByIdCustomer from 'src/views/reports/TableListSalesByIdCustomer'
import { useRouter } from 'next/router'
import TableListOrdersByIdCustomer from 'src/views/reports/TableListOrdersByIdCustomer'

  
interface OrderInterface{
  idOrder: number;
  idStoreShipping: string;
  idStoreRecieve: string;
  dateDeparture: string;
  idCustomer: number;
  dateEntry: string;
  total: number;
  status: string;
}

//<TableListOrdersByIdCustomer orders={sales}/>
const ListSalesByIdCustomer: React.FC = () => {
  const router = useRouter();  

  const [idCustomer, setIdCustomer] = useState<string | null>(null);

  useEffect(() => {
    const { idCustomer } = router.query;
    if (typeof idCustomer === 'string') {
        setIdCustomer(idCustomer);
    }
  }, [router.query]);

  const [sales, setSales] = useState<OrderInterface[]>([
    {
      idOrder: 1,
      idStoreShipping: 'STR-1',
      idStoreRecieve: 'STR-2',
      dateDeparture: '2024-01-01',
      idCustomer: 4,
      dateEntry: '2024-01-02',
      total: 200,
      status: 'Route',
    },
    {
      idOrder: 2,
      idStoreShipping: 'STR-1',
      idStoreRecieve: 'STR-2',
      dateDeparture: '2024-01-01',
      idCustomer: 4,
      dateEntry: '2024-01-02',
      total: 200,
      status: 'Route',
    }
  ]);
  

  return (
    <Grid container spacing={6}>
    <Grid item xs={12} md={4}>
      <Typography variant='h5'>
        <Link target='_blank'>
          Listado de Productos
        </Link>
      </Typography>
      <Typography variant='body2'>Listado general de todos los productos</Typography>
    </Grid>
    <Grid item xs={12} md={8} >
      
    </Grid>
    <Grid item xs={12}>
      <Card>
        
      </Card>
    </Grid>
    </Grid>
  )
}

export default ListSalesByIdCustomer
