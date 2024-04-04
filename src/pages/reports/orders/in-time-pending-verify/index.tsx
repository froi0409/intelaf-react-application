import { Card, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { TableReportInTime } from 'src/components/reports/orders/TableReportInTime';

export interface InTimePendingVerifyStructure {
    idOrder: number;
    nameStoreShipping: string;
    nameStoreReceive: string;
    dateDeparture: string;
    estimatedDeliveryDate: string;
    total: number;
    status: string;
}

const InTimePendingVerify = ({report}: any) => {
    useEffect(() => {
        //fecthData()
    }, [])
    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
                <Typography variant='h5'>
                    <Link target='_blank'>
                        Reporte a tiempo de estar en tienda sin Verificacion
                    </Link>
                </Typography>
                <Typography variant='body2'>Listado de pedido que están en tiempo de estar en la tienda pero debe verificarse su ingreso.</Typography>
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
        const jwt = context.req.cookies['jwt']
        const currentStore = context.req.cookies['store']
        if(currentStore == undefined) {
            throw new Error('not store')
        }

        const response = await axios.get(`${process.env.URL_API_BACKEND}/v1/order/reportInTimeWithPendingVerification/${currentStore}`,{
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


export default InTimePendingVerify;
