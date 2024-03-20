// ** React Imports
import { useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { Button } from '@mui/material'

interface StoreInfo {
  storeCode: string;
  stock: number;
}

interface Product{
  idProduct: string;
  name: string;
  manufacturer: string;
  price: number;
  description: string;
  guarantyMonths: number;
  stores:StoreInfo[];
}

interface FormListProductProps {
  products: Product[];
}

const Row = (props: { row: Product }) => {
  // ** Props
  const { row } = props

  // ** State
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.idProduct}
        </TableCell>
        <TableCell align='right'>{row.name}</TableCell>
        <TableCell align='right'>{row.manufacturer}</TableCell>
        <TableCell align='right'>{row.price}</TableCell>
        <TableCell align='right'>{row.description}</TableCell>
        <TableCell align='right'>{row.guarantyMonths}</TableCell>
        <TableCell align='right'>
          <Button size='small' sx={{ mr: 2 }} variant='contained'>
            Editar Producto
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ m: 2 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Stock en Tiendas
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Codigo de la Tienda</TableCell>
                    <TableCell>Nombre de la Tienda</TableCell>                    
                    <TableCell align='right'>Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.stores.map(historyRow => (
                    <TableRow key={historyRow.storeCode}>
                      <TableCell component='th' scope='row'>
                        {historyRow.storeCode}
                      </TableCell>
                      <TableCell>{historyRow.storeCode}</TableCell>
                      <TableCell align='right'>{historyRow.stock}</TableCell>                          
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const TableCollapsible : React.FC<FormListProductProps> = ({ products }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='Listado de Productos'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Codigo Producto</TableCell>
            <TableCell align='right'>Nombre</TableCell>
            <TableCell align='right'>Fabricante</TableCell>
            <TableCell align='right'>Precio</TableCell>
            <TableCell align='right'>Descripcion</TableCell>
            <TableCell align='right'>Garantia</TableCell>
            <TableCell align='right'>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(row => (
            <Row key={row.idProduct} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCollapsible
