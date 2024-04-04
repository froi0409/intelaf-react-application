// ** React Imports
//import { useState, ChangeEvent } from 'react'
import * as React from 'react';
import { useState, Fragment } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Box, Button, Checkbox, Collapse, FormControlLabel, IconButton, Switch, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { ChevronDown, ChevronUp, FileEdit, Filter } from 'mdi-material-ui';
import Link from 'next/link';


interface Column {
  id: 'idOrder' | 'idStoreShipping' | 'idStoreReceive' | 'dateDeparture'| 'dateEntry'| 'total'| 'status'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'idOrder', label: 'Codigo Orden'},
  { id: 'idStoreShipping', label: 'Codigo de tienda que envia'},
  { id: 'idStoreReceive', label: 'Codigo de tienda que recibe'},  
  { id: 'dateDeparture', label: 'Fecha de salida'},  
  { id: 'dateEntry', label: 'Fecha de entrada'},  
  { id: 'total', label: 'Total'},  
  { id: 'status', label: 'Estado'},  
]

interface Payment{  
  type: string;
  amount: number;
}

interface Product{
  productId: string;
  quantity: number;
  name: string;
  price: number;
}
  
interface OrderInterface{
  idOrder: number;
  idStoreShipping: string;
  idStoreReceive: string;
  dateDeparture: string;
  dateEntry: string;
  total: number;
  status: string;
  nit: string;
  products: Product[];
  payments: Payment[];
}

interface FormListSaleProps {
  orders: OrderInterface[];
  idCustomer: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof OrderInterface;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
  id: 'idOrder',
  numeric: false,
  disablePadding: true,
  label: 'Codigo Orden',
},
{
  id: 'idStoreShipping',
  numeric: false,
  disablePadding: false,
  label: 'Codigo de tienda que envia',
},
{
  id: 'idStoreReceive',
  numeric: false,
  disablePadding: false,
  label: 'Codigo de tienda que recibe',
},
{
  id: 'dateDeparture',
  numeric: false,
  disablePadding: false,
  label: 'Fecha de salida',
},
{
  id: 'dateEntry',
  numeric: false,
  disablePadding: false,
  label: 'Fecha de entrada',
},
{
  id: 'total',
  numeric: false,
  disablePadding: false,
  label: 'Total',
},
{
  id: 'status',
  numeric: false,
  disablePadding: false,
  label: 'Estado',
},
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof OrderInterface) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof OrderInterface) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  productSelected: readonly number[];
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;  
  const { productSelected } = props;  

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme: { palette: { primary: { main: string; }; action: { activatedOpacity: number; }; }; }) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Datos de los Productos
        </Typography>
      )}
      {numSelected == 1 ? (
        <Tooltip title="Editar">          
          <Link href={{ pathname: '/pages/product/update-product', query: { idProduct: productSelected } }}>
            <IconButton>
              <FileEdit />
            </IconButton>
          </Link>
        </Tooltip>
      ) : (
        <Tooltip title="filtrar">
          <IconButton>
            <Filter />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface Props {
    row: {
      idOrder: number;
      idStoreShipping: string;
      idStoreReceive: string;
      dateDeparture: string;
      dateEntry: string;
      total: number;
      status: string;
      nit: string;
      products: Product[];
      payments: Payment[];
      // Agrega aquí cualquier otra propiedad necesaria
    };
    isSelected: (id: number) => boolean;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
  }

const TableRowWithExpansion: React.FC<Props> = ({ row, isSelected, handleClick }) => {
    const [open, setOpen] = useState<boolean>(false);
  
    const handleExpandClick = () => {
      setOpen(!open);
    };
  
    const labelId = `enhanced-table-checkbox-${row.idOrder}`;
  
    return (
      <>
        <TableRow
          hover
          role="checkbox"
          aria-checked={isSelected(row.idOrder)}
          tabIndex={-1}
          selected={isSelected(row.idOrder)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell padding="checkbox">
            <Checkbox
              onClick={(event) => handleClick(event, row.idOrder)}
              color="primary"
              checked={isSelected(row.idOrder)}
              inputProps={{
                'aria-labelledby': labelId,
              }}
            />
          </TableCell>
          <TableCell align="right">{row.idOrder}</TableCell>
          <TableCell align="right">{row.idStoreShipping}</TableCell>
          <TableCell align="right">{row.idStoreReceive}</TableCell>
          <TableCell align="right">{row.dateDeparture}</TableCell>
          <TableCell align="right">{row.dateEntry}</TableCell>
          <TableCell align="right">{row.total}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={handleExpandClick}>
              {open ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6} sx={{ py: '0 !important' }}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ m: 2 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Productos
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Codigos de producto</TableCell>                                     
                      <TableCell align='right'>Cantidad de productos</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.products.map(historyRow => (
                      <TableRow key={historyRow.productId}>
                        <TableCell component='th' scope='row'>
                          {historyRow.name}
                        </TableCell>                        
                        <TableCell align='right'>{historyRow.quantity}</TableCell>                          
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Typography variant='h6' gutterBottom component='div'>
                  Tipo de pago
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tipo de pago</TableCell>                                     
                      <TableCell align='right'>Cantidad del pago</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.payments.map(historyRow => (
                      <TableRow key={historyRow.type}>
                        <TableCell component='th' scope='row'>
                          {historyRow.type}
                        </TableCell>
                        <TableCell align='right'>{historyRow.amount}</TableCell>                          
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };


const TableListSalesByIdCustomer: React.FC<FormListSaleProps> = ({ orders,idCustomer }) => {
    // console.log(props.dataServer);
  const rows = orders;
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof OrderInterface>('idOrder');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof OrderInterface,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: { idOrder: any; }) => n.idOrder);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  
  const visibleRows = React.useMemo(
    () =>
    stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, rows, orderBy, page, rowsPerPage],
  );


  /* GENERATE HTML*/

  const [htmlContent, setHtmlContent] = useState('');
  const [downloadOn, setDownloadOn] = useState(false);
  
  const generateHtmlContent = () => {
    // Genera el contenido HTML basado en los datos de las ventas
    let tableHtml = `
      <html>
        <head>
          <title>Listado de Ordenes en curso por codigo de usuario</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            h1 {
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 0 auto;
            }
            th, td {
              padding: 8px;
              border: 1px solid #ddd;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            ul {
              list-style-type: none;
              padding: 0;
              margin: 0;
            }
            ul li {
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
          <h1>Listado de Ordenes en curso por codigo de usuario</h1>
          <h3>Codigo de usuario: ${idCustomer}</h3>
          <table>
            <thead>
              <tr>
                <th>Código Orden</th>
                <th>Código de tienda que envía</th>
                <th>Código de tienda que recibe</th>
                <th>Fecha de salida</th>
                <th>Fecha de entrada</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Productos</th>
                <th>Tipo de pago</th>
              </tr>
            </thead>
            <tbody>
      `;

    orders.forEach(order => {
      tableHtml += `
        <tr>
          <td>${order.idOrder}</td>
          <td>${order.idStoreShipping}</td>
          <td>${order.idStoreReceive}</td>
          <td>${order.dateDeparture}</td>
          <td>${order.dateEntry}</td>
          <td>${order.total}</td>
          <td>${order.status}</td>
          <td>
            <ul>
    `;
  
    order.products.forEach(product => {
      tableHtml += `
        <li>${product.name} - Cantidad: ${product.quantity}</li>
      `;
    });
  
    tableHtml += `
          </ul>
        </td>
        <td>
          <ul>
    `;
  
    order.payments.forEach(payment => {
      tableHtml += `
        <li>${payment.type} - Cantidad: ${payment.amount}</li>
      `;
    });
  
    tableHtml += `
          </ul>
        </td>
      </tr>
    `;
  });

  tableHtml += `
          </tbody>
        </table>
      </body>
    </html>
  `;
    
    setHtmlContent(tableHtml);
  };

  const openHtmlAsDownload = () => {
    generateHtmlContent();
    setDownloadOn(true);
  };

  React.useEffect(() => {
    // Descarga el HTML cuando htmlContent se actualice
    if (htmlContent !== '' && downloadOn == true) {
      // Crea un Blob con el contenido HTML
      const blob = new Blob([htmlContent], { type: 'text/html' });
    
      // Crea un enlace para descargar el Blob
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ordenes_en_curso_Id_'+idCustomer+'.html'; // Nombre del archivo de descarga
      a.style.display = 'none';
    
      // Añade el enlace al DOM y haz clic automáticamente
      document.body.appendChild(a);
      a.click();
    
      // Limpia el enlace del DOM y libera el Blob
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadOn(false);
    }
  }, [htmlContent,downloadOn]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} productSelected={selected}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
            {visibleRows.map((row) => (
                <TableRowWithExpansion
                  key={row.idOrder} // Supongo que tienes una propiedad idProduct única para cada fila
                  row={row}
                  isSelected={isSelected} // Supongamos que isSelected es una función que verifica si una fila está seleccionada
                  handleClick={handleClick} // Supongamos que handleClick es una función de manejo de clics para seleccionar una fila
                />
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
        <Button variant="contained" color="primary" onClick={openHtmlAsDownload}>
          Exportar a HTML
        </Button>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Sin espaciado"
      />
    </Box>
  );
}
export default TableListSalesByIdCustomer