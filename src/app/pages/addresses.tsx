import React, { useState } from 'react';
import { Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { ChangeEvent } from 'react';
import { postAddress } from '../api/address';
import { Address } from '../types/address';
import AddressessTable from '../components/tableAddress';
import AddAddressModal from '../components/modals/addressModal';
import BasicModal from "../components/modal"


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddressesPage = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    addressName: '',
    addressLine: '',
    city: '',
    postalCode: '',
    country: '',
    state: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    // Perform any validation or data processing here before saving
    const newAddress: Address = formData as Address;

    const response = await postAddress(newAddress);
    console.log(response);

    if (response) {
      setShowSuccessModal(true);
      // Clear the form data
      setFormData({
        addressName: '',
        addressLine: '',
        city: '',
        postalCode: '',
        country: '',
        state: ''
      });
      handleClose();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Typography variant="h5">Addresses</Typography>
      <Box mt={4} />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          fontWeight: theme.typography.fontWeightBold,
        }}
      >
        Add
      </Button>
      <AddAddressModal
        open={open}
        onClose={handleClose}
        handleSave={handleSave}
        formData={formData}
        handleChange={handleChange}
      />
      {showSuccessModal && (
        <BasicModal message="Address inserted correctly" handleClose={() => setShowSuccessModal(false)} />
      )}

      <Box mt={4} /> {/* Use mt={4} for margin */}
      <AddressessTable />
    </>
  );
};

export default AddressesPage;
