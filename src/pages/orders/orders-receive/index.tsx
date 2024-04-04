import { Card, Grid, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { SearchBarCustomer } from 'src/components/customers/list-all-customers/SearchBarCustomer';
import TableOrdersReceive from 'src/components/orders/list/TableOrdersReceive';
import { OrdersListStructure, getListReceiveStore } from 'src/utils/apiUtils/order/listOrders';
import { getCurrentStore } from 'src/utils/helpers/cookieStore';

const OrdersReceive = () => {
    const currentStore = getCurrentStore();
    const [orders, setOrders] = useState([]);
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const data = await getListReceiveStore(currentStore)
            setOrders(data);
            setData(data);
        } catch (error: any) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (searchvalue: string | null) => {
        const findOrder = data.filter((order : OrdersListStructure) => {
          if (searchvalue) {
            return (
              order.idOrder.toString().toLowerCase().includes(searchvalue.toLowerCase()) ||
              order.idStoreShipping.toLowerCase().includes(searchvalue.toLowerCase()) ||          
              order.status.toLowerCase().includes(searchvalue.toLowerCase())           
            );
          } else {
            return true;
          }
        });
        setOrders(findOrder)
      }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
                <Typography variant='h5'>
                    <Link target='_blank'>
                        Listado de las ordenes a Recibir
                    </Link>
                </Typography>
                <Typography variant='body2'>Listado general de todas las ordenes con entrega a esta tienda</Typography>
            </Grid>
            <Grid item xs={12} md={6} >
                <SearchBarCustomer handleSearch={handleSearch} placeholdershow='Buscar orden,tienda,estado' />
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableOrdersReceive dataServer={orders} />
                </Card>
            </Grid>
        </Grid>
    )
}
import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
OrdersReceive.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default OrdersReceive
