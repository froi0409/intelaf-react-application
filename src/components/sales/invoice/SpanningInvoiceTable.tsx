import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  CardActions,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { InvoiceProduct } from "src/utils/apiUtils/sale/invoice/registerSale";


const TAX_RATE = 0.12;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function subtotal(items: readonly InvoiceProduct[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

export default function SpanningInvoiceTable(props: any) {

  const invoiceProduct: InvoiceProduct[] = props.products;
  
  const invoiceSubtotal = subtotal(invoiceProduct);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  props.updateTotal(invoiceTotal);
  
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      { invoiceProduct.length > 0 &&
      <TableContainer component={Paper}>
        <Grid item xs={12}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  Detalles
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Desc</TableCell>
                <TableCell align="right">Cant.</TableCell>
                <TableCell align="right">P.Unitario</TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceProduct.map((row: InvoiceProduct) => (
                <TableRow key={row.id_product}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">{row.unit_price}</TableCell>
                  <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Impuesto</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </TableContainer>}
    </form>
  );
}
