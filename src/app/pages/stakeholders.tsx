import React, { useState } from 'react';
import { Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';
import { getStakeholders } from '../api/stakeholder'
import { Stakeholder } from '../types/stakeholder';
import { getAddresses, getAllAddresses } from '../api/address';
import { Address } from '../types/address';
import BasicModal from "../components/modal"
import StakeholdersTable from '../components/tableStakeholder';




import { ChangeEvent } from 'react';

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

const StakeholdersPage = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    id: '',
    email: '',
    phone: '',
    businessAddress: '',
    taxAddress: ''
  });

  const [stakeholderList, setStakeholderList] = useState<Stakeholder[]>([]);
  const [addressList, setAddressList] = useState<Address[]>([]);


  React.useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching data...');
        const addressData = await getAddresses();
        setAddressList(addressData.addressList);
        console.log('Data fetched is ' + addressData[2].addressName)
        const stakeholderData = await getStakeholders();
        setStakeholderList(stakeholderData.stakeholderList);
        console.log('Data fetched is ' + stakeholderList[0].name)
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
      }
    }

    fetchData();
  }, []);



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    console.log(formData);

    // Clear the form data
    setFormData({
      name: '',
      type: '',
      id: '',
      email: '',
      phone: '',
      businessAddress: '',
      taxAddress: ''
    });

    handleClose();
  };

  const stakeHolderTypes = [
    {
      value: '1',
      label: 'Customer',
    },
    {
      value: '2',
      label: 'Supplier',
    },
    {
      value: '3',
      label: 'Partner',
    }
  ];


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Typography variant="h5">Stakeholders</Typography>
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
              New Stakeholder
            </Typography>
            <List>
              <ListItem>
                <TextField
                  required
                  id="id"
                  name="id"
                  label="Identification code"
                  fullWidth
                  variant="standard"
                  value={formData.id}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={formData.name}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  required
                  id="type"
                  select
                  name="type"
                  label="Type"
                  fullWidth
                  variant="standard"
                  value={formData.type}
                  onChange={handleChange}
                >
                  {stakeHolderTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </ListItem>
              <ListItem>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  variant="standard"
                  value={formData.email}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone"
                  fullWidth
                  variant="standard"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  id="businessAddress"
                  select
                  name="state"
                  label="Business address"
                  fullWidth
                  variant="standard"
                  value={formData.businessAddress}
                  onChange={handleChange}
                >
                  {addressList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.addressName}
                    </MenuItem>
                  ))}
                </TextField>
              </ListItem>
              <ListItem>
                <TextField
                  required
                  id="taxAddress"
                  select
                  name="taxAddress"
                  label="Tax Address"
                  fullWidth
                  variant="standard"
                  value={formData.taxAddress}
                  onChange={handleChange}
                >
                  {addressList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.addressName}
                    </MenuItem>
                  ))}
                </TextField>
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
        <BasicModal message="Stakeholder inserted correctly" handleClose={() => setShowSuccessModal(false)} />
      )}

      <Box mt={4} /> {/* Use mt={4} for margin */}
      <StakeholdersTable />
    </>
  );
};

export default StakeholdersPage;
