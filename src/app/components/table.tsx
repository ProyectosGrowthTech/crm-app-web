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
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8082/v1/invoice/?page=0&pageSize=10', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            {invoices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((invoice) => (
                <TableRow key={invoice.id}>
                  {columns.map((column) => {
                    const value = invoice[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : String(value)} {/* Convert Date values to strings */}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
