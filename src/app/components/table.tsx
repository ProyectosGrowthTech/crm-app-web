import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Invoice } from '../types/invoice';
import { ChangeEvent } from 'react';
import { InvoiceDTO } from '../types/invoiceDto';

interface Column {
  id: keyof Invoice;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [invoices, setInvoices] = React.useState<InvoiceDTO>({ invoiceList: [], totalInvoices: 0 });

  const fetchData = async (page = 0, pageSize = 10) => {
    try {
      const url = `http://localhost:8082/v1/invoice/?page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setInvoices(data); // Set the entire data object
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);





  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    fetchData(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when changing rows per page
    fetchData(0, newRowsPerPage);
  };


  const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'invoiceDate', label: 'Invoice Date', minWidth: 170 },
    { id: 'totalAmount', label: 'Total Amount', minWidth: 150 },
    { id: 'status', label: 'Status', minWidth: 150 },
  ];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ backgroundColor: '#3B82F6', color: 'white', fontWeight: 'bold' }}
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
              invoices.invoiceList
                .map((invoice) => (
                  <TableRow key={invoice.id}>
                    {columns.map((column) => {
                      const value = invoice[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : String(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>Loading...</TableCell>
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
