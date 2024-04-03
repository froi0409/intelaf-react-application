// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

interface Product{
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  description: string;
  guarantyMonths: number; 
  quantity:number; 
}

interface FormListProductProps {
  products: Product[];
}

const TableListBestSellingProducts: React.FC<FormListProductProps> = ({ products }) => {

  const rows = products;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Codigo de Producto</TableCell>
            <TableCell align='right'>Nombre</TableCell>
            <TableCell align='right'>Fabricante</TableCell>
            <TableCell align='right'>Descripcion</TableCell>
            <TableCell align='right'>Precio</TableCell>
            <TableCell align='right'>Garantia</TableCell>
            <TableCell align='right'>Cantidad Vendidos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell align='right'>{row.name}</TableCell>
              <TableCell align='right'>{row.manufacturer}</TableCell>
              <TableCell align='right'>{row.description}</TableCell>
              <TableCell align='right'>{row.price}</TableCell>
              <TableCell align='right'>{row.guarantyMonths}</TableCell>
              <TableCell align='right'>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableListBestSellingProducts
