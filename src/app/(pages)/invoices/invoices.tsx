import React, { useState } from 'react';
import { Typography, useTheme } from '@mui/material';
import InvoicesTable from '../../components/tableInvoice';
import Box from '@mui/material/Box';
import InvoiceModal from '../../components/modals/invoiceModal';
import { ChangeEvent } from 'react';
import BasicModal from "../../components/modal"
import { postInvoice } from '../../api/invoice';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Stakeholder } from '../../types/stakeholder';
import { getStakeholders } from '../../api/stakeholder';
import { InvoiceDetails } from '../../types/invoiceDetails';


const InvoicePage = () => {
  // Table component content goes here
  const [open, setOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    invoiceDate: new Date(),
    taxableAmount: null,
    tax: null,
    totalAmount: null,
    status: '',
    type: null,
    stakeholderOriginId: '',
    stakeholderDestinationId: null,
    payment: null,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
      // See how to perform validation as interface do not match modal in this case
      const newInvoice: InvoiceDetails = formData as InvoiceDetails;

      const response = await postInvoice(newInvoice);
      console.log(response);
  
      if (response) {
        setShowSuccessModal(true);
        // Clear the form data
        setFormData({
          invoiceDate: new Date(),
          taxableAmount: null,
          tax: null,
          totalAmount: null,
          status: '',
          type: null,
          stakeholderOriginId: '',
          stakeholderDestinationId: null,
          payment: null,
        });
        // handleClose();
      }
  };

  const theme = useTheme();

  const [stakeholderList, setStakeholderList] = useState<Stakeholder[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching data...');
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


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };
  
  return (
    <>
      <Typography variant="h5">
        Sold invoices
      </Typography>

      <Box mt={4} /> {/* Use mt={4} for margin */}
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
      <Box mt={4} /> {/* Use mt={4} for margin */}

      <InvoiceModal
        open={open}
        onClose={handleClose}
        handleSave={handleClose}
        formData={formData}
        handleChange={handleChange}
        stakeholderList={stakeholderList}
      />
      {showSuccessModal && (
        <BasicModal message="Invoice inserted correctly" handleClose={() => setShowSuccessModal(false)} />
      )}
      <InvoicesTable />
    </>
  );
};

export default InvoicePage;
