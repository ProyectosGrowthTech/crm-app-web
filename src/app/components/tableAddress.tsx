import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { AddressDTO } from '../types/addressDTO';
import { ChangeEvent } from 'react';
import { getAddresses } from '../api/address'
import { addressTableColumns } from '../constants/addressTableColumns';
import theme from '../styles/theme'
import { format } from 'date-fns';



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [addresses, setAddresses] = React.useState<AddressDTO>({ addressList: [], totalAddresses: 0 });

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAddresses(page, rowsPerPage);
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    getAddresses(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when changing rows per page
    getAddresses(0, newRowsPerPage);
  };

  // Helper function to format the date as "mm/dd/yyyy"
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MM/dd/yyyy');
  };

  const logObject = (obj: Object) => {
    if (obj != null)
      return obj.toString();
    else
      return null;
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {addressTableColumns.map((column) => (
                <TableCell
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: theme.typography.fontWeightBold
                  }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.addressList.length > 0 ? (
              addresses.addressList.map((address) => (
                <TableRow key={address.id}>
                  {addressTableColumns.map((column) => {
                    const addressValue = address[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                          {logObject(addressValue)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={addressTableColumns.length}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>



        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={addresses.totalAddresses}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
