import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { InvoiceDTO } from '../types/invoiceDTO';
import { ChangeEvent } from 'react';
import { getInvoices } from '../api/invoice'
import { invoiceTableColumns } from '../constants/tableColumns';
import theme from '../styles/theme'
import { format } from 'date-fns';



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [invoices, setInvoices] = React.useState<InvoiceDTO>({ invoiceList: [], totalInvoices: 0 });

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getInvoices(page, rowsPerPage);
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    getInvoices(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when changing rows per page
    getInvoices(0, newRowsPerPage);
  };

  // Helper function to format the date as "mm/dd/yyyy"
  const formatDate = (date: Date) => {
    console.log('Holaa');
    return format(new Date(date), 'MM/dd/yyyy');
  };

  const logObject = (obj: Object) => {
    console.log(typeof obj);
    return obj.toString();
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {invoiceTableColumns.map((column) => (
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
            {invoices.invoiceList.length > 0 ? (
              invoices.invoiceList.map((invoice) => (
                <TableRow key={invoice.id}>
                  {invoiceTableColumns.map((column) => {
                    const value = invoice[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value instanceof Date ? (
                          formatDate(value)
                        ) : (
                          logObject(value)
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={invoiceTableColumns.length}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>



        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={invoices.totalInvoices}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
