import React, { useState } from 'react';
import { Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import SaveIcon from '@mui/icons-material/Save';
import { ChangeEvent } from 'react';
import { postAddress } from '../api/address';
import { Address } from '../types/address';
import { Modal } from '@mui/material'
import BasicModal from "../components/modal"
import AddressessTable from '../components/tableAddress';

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
    addressLine: '',
    city: '',
    postalCode: '',
    country: '',
    addressName: '',
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
        addressLine: '',
        city: '',
        postalCode: '',
        country: '',
        addressName: '',
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              New address
            </Typography>
            <List>
              <ListItem>
                <TextField
                  required
                  id="addressName"
                  name="addressName"
                  label="Address Name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={formData.addressName}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  required
                  id="addressLine"
                  name="addressLine"
                  label="Address line"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={formData.addressLine}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={formData.city}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
                  value={formData.state}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  required
                  id="postalCode"
                  name="postalCode"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                  value={formData.country}
                  onChange={handleChange}
                />
              </ListItem>
              {/* Rest of the form fields with value and onChange */}
            </List>
            <Box mt={4} />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              Save
            </Button>
          </React.Fragment>
        </Box>
      </Modal>
      {showSuccessModal && (
        <BasicModal message="Address inserted correctly" handleClose={() => setShowSuccessModal(false)} />
      )}

      <Box mt={4} /> {/* Use mt={4} for margin */}
      <AddressessTable />
    </>
  );
};

export default AddressesPage;
