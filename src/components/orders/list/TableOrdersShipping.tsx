import React from 'react';
import { useRouter } from 'next/router';

// ** MUI Components
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';

// ** Icons Imports
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';

//** Custom IMPORTS */
import { OrdersListStructure } from 'src/utils/apiUtils/order/listOrders';
import { EnhancedTableToolbarProps, Order, getComparator, stableSort } from 'src/components/customers/list-all-customers/TableCustomer';

interface HeadCell {
    disablePadding: boolean;
    id: keyof OrdersListStructure;
    label: string;
    numeric: boolean;
  }

const headCells: readonly HeadCell[] = [
    {
    id: 'idOrder',
    numeric: true,
    disablePadding: true,
    label: 'Codigo de la orden',
  },
  {
    id: 'idStoreReceive',
    numeric: false,
    disablePadding: false,
    label: 'codigo de la tienda que recibe',
  },
  {
    id: 'dateDeparture',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de partida',
  },
  {
    id: 'dateEntry',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de entrada',
  },
  {
    id: 'estimatedDeliveryDate',
    numeric: false,
    disablePadding: false,
    label: 'Fecha estimada de entrada',
  },
  {
    id: 'total',
    numeric: false,
    disablePadding: false,
    label: 'total',
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
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof OrdersListStructure) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }
  
  function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof OrdersListStructure) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
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


function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, handleEdit } = props;
  
    const handleClickEdit = () => {
      if (numSelected !== null) {
        handleEdit();
      }
    };
  
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
            No. de orden {numSelected} Seleccionado
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Ordenes
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Actualizar">
          <IconButton onClick={handleClickEdit} disabled={numSelected === null}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        ) : (
          <Tooltip title="filtrar">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  export default function TableOrdersShipping({dataServer}: any) {
    const rows = dataServer;
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof OrdersListStructure>('idOrder');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const router = useRouter();
  
    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof OrdersListStructure,
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.map((n: { id_user: any; }) => n.id_user);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected: readonly number[] = [];
  
      if (selectedIndex === -1) {
        newSelected = [id]; // Clear existing selection (optional)
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
  
    const handleEdit = () => {
      router.push(`/orders/update-order/${selected[0]}`);
    }
  
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
      [rows,order, orderBy, page, rowsPerPage],
    );
  
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length > 0 ? selected[0] : 0} handleEdit={handleEdit} />
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
                {visibleRows.map((row, index) => {
                  const row_id_user: number = row.idOrder as number;
                  const isItemSelected = isSelected(row_id_user);
                  const labelId = `enhanced-table-checkbox-${index}`;
  
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row_id_user)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.idOrder}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.idOrder}
                      </TableCell>
                      <TableCell align="right">{row.idStoreReceive}</TableCell>
                      <TableCell align="right">{new Date(row.dateDeparture).toLocaleDateString()}</TableCell>
                      <TableCell align="right">{ row.dateEntry ? new Date(row.dateEntry).toLocaleDateString() : 'NO HAY FECHA'}</TableCell>
                      <TableCell align="right">{new Date(row.estimatedDeliveryDate).toLocaleDateString()}</TableCell>
                      <TableCell align="right">Q.{row.total}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
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