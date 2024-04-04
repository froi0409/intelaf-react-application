import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// @ts-ignore
import { v4 as uuidv4 } from "uuid"; 
import { PaymentInfo } from 'src/utils/apiUtils/sale/invoice/registerSale';


function createData(
    type: string,
    amount: number,
) {
    return { type, amount };
}

export default function TableInvoicePayments(props: any) {

    const rows = props.payments.map((payment: PaymentInfo) => {
        return createData(
            payment.type,
            payment.amount,
        );
    });

    return (
        <React.Fragment >
        {rows.length > 0 &&<TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tipo de Pago</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row: PaymentInfo) => (
                        <TableRow
                            key={uuidv4()}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.type}
                            </TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>}
        </React.Fragment>
    );
}