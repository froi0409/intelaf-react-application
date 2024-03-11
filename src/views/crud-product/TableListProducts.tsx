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

const createData = (id_product: string, name: string, manufacturer: string, price: number, description: string, guaranty_months: number) => {
  return {
    id_product,
    name,
    manufacturer,
    price,
    description,
    guaranty_months,
    history: [
      {
        id_store: 'STR-1',
        name_store: 'ABC',
        amount: 3
      },
      {
        id_store: 'STR-2',
        name_store: 'ABD',
        amount: 50
      }
    ]
  }
}

const Row = (props: { row: ReturnType<typeof createData> }) => {
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
          {row.id_product}
        </TableCell>
        <TableCell align='right'>{row.name}</TableCell>
        <TableCell align='right'>{row.manufacturer}</TableCell>
        <TableCell align='right'>{row.price}</TableCell>
        <TableCell align='right'>{row.description}</TableCell>
        <TableCell align='right'>{row.guaranty_months}</TableCell>
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
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.id_store}>
                      <TableCell component='th' scope='row'>
                        {historyRow.id_store}
                      </TableCell>
                      <TableCell>{historyRow.name_store}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>                          
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

const rows = [
  createData('PR-1', 'JABON', 'ZOTE', 20.00, 'Es un jabon bueno para todo uso', 12)  
]

const TableCollapsible = () => {
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
          {rows.map(row => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableCollapsible
