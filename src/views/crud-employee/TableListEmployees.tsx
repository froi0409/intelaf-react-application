// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

interface Column {
  id: 'username' | 'nit' | 'name' | 'phone' | 'dpi' | 'email' | 'address'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'username', label: 'Codigo Empleado'},
  { id: 'nit', label: 'NIT'},
  { id: 'name', label: 'Nombre'},
  { id: 'phone', label: 'Telefono'},
  { id: 'dpi', label: 'DPI'},
  { id: 'email', label: 'Correo Electronico'},
  { id: 'address', label: 'Direccion'},
  
]

interface Data {  
  username: string
  nit: string
  name: string
  phone: number
  dpi: number
  email: string
  address: string
}

function createData(username: string, nit: string, name:string, phone:number, dpi:number, email:string, address:string): Data {
  //const density = population / size

  return { username,nit,name,phone,dpi,email,address }
}

const rows = [
  createData('EM-1','70303030','Peter Jackson',30303030,2145365478965,'empleado1@gmail.com','Calle 1 Z.1 Quetzaltenango'),
  createData('EM-2','71303030','Frederi Meyer',30353535,1542654781254,'empleado2@gmail.com','Calle 2 Z.2 Quetzaltenango')
]

const TableListEmployees = () => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.username}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableListEmployees
