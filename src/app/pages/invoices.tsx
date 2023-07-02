import React from 'react';
import TableExample from '../components/table';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';


const InvoicePage = () => {
  // Table component content goes here
  return (
    <>
      <Typography variant="h5">
        Sold invoices
      </Typography>
      <Box mt={4} /> {/* Use mt={4} for margin */}
      <TableExample />
    </>
  );
};

export default InvoicePage;
