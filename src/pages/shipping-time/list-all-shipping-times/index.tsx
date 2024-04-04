import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import React, { Fragment, useEffect, useState } from 'react';
import TableShippingTimes from 'src/components/shipping-time/TableShippingTimes';
import { getAllShippingTimes } from 'src/utils/apiUtils/shipping-time/allShippingTimesUtil';
import { SearchBarShippingTimes } from 'src/components/shipping-time/SearchBarShippingTimes';

interface ShippingTimeData {
    idStore1: string,
    idStore2: string,
    time: number
}

const AllShippingTimesTable = () => {
    const [shippingTimeData, setShippingTimeData] = useState([]);
    const [data, setData] = useState([]);

    const handleSearch = (searchValue: string | null) => {
        const findShippingTime = data.filter((shippingTime: ShippingTimeData | any) => {
            if (searchValue) {
                return (
                    shippingTime.idStore1.toLowerCase().includes(searchValue.toLowerCase()) ||
                    shippingTime.idStore2.toLowerCase().includes(searchValue.toLowerCase())
                );
            } else {
                return true;
            }
        })
        setShippingTimeData(findShippingTime);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllShippingTimes();
                setShippingTimeData(response.data);
                setData(response.data);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };

        fetchData();
    }, []);

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
                <Typography variant='h5'>
                <Link target='_blank'>
                    Listado de Tiempos
                </Link>
                </Typography>
                <Typography variant='body2'>Listado de Tiempo Entre Tiendas</Typography>
            </Grid>
            <Grid item xs={12} md={6} >
                <SearchBarShippingTimes handleSearch={handleSearch} />
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableShippingTimes dataServer={shippingTimeData}></TableShippingTimes>
                </Card>
            </Grid>
        </Grid>
    )

}

import EmployeeLayout from 'src/layouts/EmployeeLayout'
import { ReactNode} from 'react'
AllShippingTimesTable.getLayout = (page: ReactNode) => <EmployeeLayout>{page}</EmployeeLayout>

export default AllShippingTimesTable;

