import React from 'react';
import { Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

const AddressesPage = () => {
  const theme = useTheme();

  return (
    <>
      <Typography variant="h5">Addresses</Typography>
      <Box mt={4} /> {/* Use mt={4} for margin */}
      <Button variant="contained" startIcon={<AddIcon />}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightBold,
        }}>
        Add
      </Button>
    </>
  );
};

export default AddressesPage;
