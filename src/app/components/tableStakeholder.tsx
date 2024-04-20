import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ChangeEvent } from 'react';
import { stakeholderTableColumns } from '../constants/stakeholderTableColumns';
import theme from '../styles/theme'
import { format } from 'date-fns';
import { StakeholderDTO } from '../types/stakeholderDTO';
import { getStakeholders } from '../api/stakeholder';



export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [stakeholders, setStakeholders] = React.useState<StakeholderDTO>({ stakeholderList: [], totalStakeholders: 0 });

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getStakeholders(page, rowsPerPage);
        setStakeholders(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    getStakeholders(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset page to 0 when changing rows per page
    getStakeholders(0, newRowsPerPage);
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
              {stakeholderTableColumns.map((column) => (
                <TableCell
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: theme.typography.fontWeightBold,
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
            {stakeholders.stakeholderList.length > 0 ? (
              stakeholders.stakeholderList.map((stakeholder) => (
                <TableRow key={stakeholder.id}>
                  {stakeholderTableColumns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'businessAddress' || column.id === 'taxAddress'
                        ? stakeholder[column.id]?.addressName // Access the name property of businessAddress or taxAddress
                        : column.id === 'stakeholderType'
                          ? stakeholder.stakeholderType?.name // Access the name property of stakeholderType
                          : String(stakeholder[column.id])} {/* Convert the property to a string */}
                    </TableCell>

                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={stakeholderTableColumns.length}>Loading...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>



      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={stakeholders.totalStakeholders}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
