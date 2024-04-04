import { Card, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { TableReportInTime } from 'src/components/reports/orders/TableReportInTime';
import { getCookieJwtGetServerSideProps } from 'src/utils/cookieUtils';

export interface InTimePendingVerifyStructure {
    idOrder: number;
    nameStoreShipping: string;
    nameStoreReceive: string;
    dateDeparture: string;
    estimatedDeliveryDate: string;
    total: number;
    status: string;
}

const OverdueArrivingStore = ({report}: any) => {
    useEffect(() => {
        //fecthData()
    }, [])
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
                <Typography variant='h5'>
                    <Link target='_blank'>
                        Reporte pedidos atrasados
                    </Link>
                </Typography>
                <Typography variant='body2'>Listado de todos los pedidos atrasados que llegarán a la tienda.</Typography>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <TableReportInTime dataServer={report} />
                </Card>
            </Grid>
        </Grid>
    )
}

export async function getServerSideProps(context: any) {
    try {
        const jwt = getCookieJwtGetServerSideProps(context)
        const currentStore = context.req.cookies['idStore']
        if(currentStore == undefined) {
            throw new Error('not store')
        }

        const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/order/reportOverdueArrivingStore/${currentStore}`,{
            headers: {
                Authorization: jwt
            }
        })
        const data = await response.data

        return {
            props: {
                report: data
            }
        };
    } catch (error) {
        return {
            props: {
                report: []
            }
        };
    }
}


export default OverdueArrivingStore;
