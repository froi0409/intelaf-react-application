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
import { Box, Checkbox, Collapse, FormControlLabel, IconButton, Switch, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { ChevronDown, ChevronUp, FileEdit, Filter } from 'mdi-material-ui';
import Link from 'next/link';


interface Column {
  id: 'idProduct' | 'name' | 'manufacturer' | 'price' | 'description' | 'guarantyMonths'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'idProduct', label: 'Codigo Producto'},
  { id: 'name', label: 'Nombre'},
  { id: 'manufacturer', label: 'Fabricante'},
  { id: 'price', label: 'Precio'},
  { id: 'description', label: 'Descripcion'},
  { id: 'guarantyMonths', label: 'Garantia (Meses)'},  
  
]

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
  id: keyof Product;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
  id: 'idProduct',
  numeric: false,
  disablePadding: true,
  label: 'Codigo Producto',
},
{
  id: 'name',
  numeric: false,
  disablePadding: false,
  label: 'Nombre',
},
{
  id: 'manufacturer',
  numeric: false,
  disablePadding: false,
  label: 'Fabricante',
},
{
  id: 'price',
  numeric: true,
  disablePadding: false,
  label: 'Precio',
},
{
  id: 'description',
  numeric: false,
  disablePadding: false,
  label: 'Descripcion',
},
{
  id: 'guarantyMonths',
  numeric: false,
  disablePadding: false,
  label: 'Garantia (Meses)',
},
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Product) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
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
      idProduct: number;
      name: string;
      manufacturer: string;
      price: string;
      description: string;
      guarantyMonths: number;
      stores: StoreInfo[];
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
  
    const labelId = `enhanced-table-checkbox-${row.idProduct}`;
  
    return (
      <>
        <TableRow
          hover
          role="checkbox"
          aria-checked={isSelected(row.idProduct)}
          tabIndex={-1}
          selected={isSelected(row.idProduct)}
          sx={{ cursor: 'pointer' }}
        >
          <TableCell padding="checkbox">
            <Checkbox
              onClick={(event) => handleClick(event, row.idProduct)}
              color="primary"
              checked={isSelected(row.idProduct)}
              inputProps={{
                'aria-labelledby': labelId,
              }}
            />
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="none">
            {row.idProduct}
          </TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.manufacturer}</TableCell>
          <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right">{row.description}</TableCell>
          <TableCell align="right">{row.guarantyMonths}</TableCell>
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
                  Stock en Tiendas
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Codigo de la Tienda</TableCell>                                     
                      <TableCell align='right'>Cantidad</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.stores.map(historyRow => (
                      <TableRow key={historyRow.storeCode}>
                        <TableCell component='th' scope='row'>
                          {historyRow.storeCode}
                        </TableCell>                        
                        <TableCell align='right'>{historyRow.stock}</TableCell>                          
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


const TableCollapsible: React.FC<FormListProductProps> = ({ products }) => {
    // console.log(props.dataServer);
  const rows = products;
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Product>('idProduct');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Product,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: { idProduct: any; }) => n.idProduct);
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
        page * rowsPerPage + rowsPerPage
      ),
    [order, rows, orderBy, page, rowsPerPage]
  );

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
            {/*rows.map((row) => (
                <TableRowWithExpansion
                  key={row.idProduct} // Supongo que tienes una propiedad idProduct única para cada fila
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
                )*/}

              {visibleRows.map((row, index) => {
                  const row_id_user: number = row.idProduct as number;
                  //const isItemSelected = isSelected(row_id_user);
                  //const labelId = `enhanced-table-checkbox-${index}`;
  
                  return (
                    <TableRowWithExpansion
                    key={row.idProduct} // Supongo que tienes una propiedad idProduct única para cada fila
                    row={row}
                    isSelected={isSelected} // Supongamos que isSelected es una función que verifica si una fila está seleccionada
                    handleClick={handleClick} // Supongamos que handleClick es una función de manejo de clics para seleccionar una fila
                    />
                  );
                })}
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
export default TableCollapsible