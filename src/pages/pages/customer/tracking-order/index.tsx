import React, { useEffect, useState } from 'react'
import { Card, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import { TableReportInTime } from 'src/components/reports/orders/TableReportInTime';
import { SearchBarCustomer } from 'src/components/customers/list-all-customers/SearchBarCustomer';
import { getTrakingsOrders } from 'src/utils/apiUtils/order/trakingsOrders';


// We dont use that, it's the same of -> InTimePendingVerifyStructure (src\pages\reports\orders\in-time-pending-verify\index.tsx)
interface TrackingOrderStructure {
    idOrder: number;
    nameStoreShipping: string;
    nameStoreReceive: string;
    dateDeparture: string;
    estimatedDeliveryDate: string;
    total: number;
    status: string;
}


const TrackingOrder = () => {
    const [trakings, setTrakings] = useState([]);
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const data = await getTrakingsOrders()
            setTrakings(data);
            setData(data);
        } catch (error: any) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearch = (searchvalue: string | null) => {
        const findOrder = data.filter((order : TrackingOrderStructure) => {
          if (searchvalue) {
            return (
              order.idOrder.toString().toLowerCase().includes(searchvalue.toLowerCase()) ||
              order.nameStoreReceive.toLowerCase().includes(searchvalue.toLowerCase()) ||          
              order.nameStoreShipping.toLowerCase().includes(searchvalue.toLowerCase()) ||          
              order.status.toLowerCase().includes(searchvalue.toLowerCase())           
            );
          } else {
            return true;
          }
        });
        setTrakings(findOrder)
      }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
                <Typography variant='h5'>
                    <Link target='_blank'>
                        Ordenes
                    </Link>
                </Typography>
                <Typography variant='body2'>Listado de todas las ordenes</Typography>
            </Grid>
            <Grid item xs={12} md={6} >
                <SearchBarCustomer handleSearch={handleSearch} placeholdershow='Buscar orden,tiendas,estado' />
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableReportInTime dataServer={trakings} />
                </Card>
            </Grid>
        </Grid>
    )
}
import UserLayout from 'src/layouts/UserLayout'
import { ReactNode} from 'react'
TrackingOrder.getLayout = (page: ReactNode) => <UserLayout>{page}</UserLayout>

export default TrackingOrder