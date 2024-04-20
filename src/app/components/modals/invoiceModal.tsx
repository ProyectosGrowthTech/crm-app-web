import React from 'react';
import { Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import SaveIcon from '@mui/icons-material/Save';
import { ChangeEvent } from 'react';
import { Modal } from '@mui/material';
import { Stakeholder } from '../../types/stakeholder'
import MenuItem from '@mui/material/MenuItem'; // Add this import
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


interface InvoiceModalProps {
    open: boolean;
    onClose: () => void;
    handleSave: () => void;
    formData: {
        invoiceDate: Date;
        taxableAmount: number | null;
        tax: number | null;
        totalAmount: number | null;
        status: string;
        type: number | null;
        stakeholderOriginId: string | null;
        stakeholderDestinationId: number | null;
        payment: number | null;
    };
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    stakeholderList: Stakeholder[];
}

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

const InvoiceModal: React.FC<InvoiceModalProps> = ({ open, onClose, handleSave, formData, handleChange, stakeholderList }) => {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Invoice Details
                    </Typography>
                    <List>
                        <ListItem>
                            <TextField
                                required
                                id="invoiceDate"
                                name="invoiceDate"
                                label="Invoice Date"
                                fullWidth
                                type="Date"
                                variant="standard"
                                value={formData.invoiceDate}
                                onChange={handleChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                required
                                id="taxableAmount"
                                name="taxableAmount"
                                label="Taxable Amount"
                                fullWidth
                                type="number"
                                variant="standard"
                                value={formData.taxableAmount}
                                onChange={handleChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                required
                                id="tax"
                                name="tax"
                                label="Tax"
                                fullWidth
                                type="number"
                                variant="standard"
                                value={formData.tax}
                                onChange={handleChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                required
                                id="totalAmount"
                                name="totalAmount"
                                label="Total Amount"
                                fullWidth
                                type="number"
                                variant="standard"
                                value={formData.totalAmount}
                                onChange={handleChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                id="status"
                                name="status"
                                label="Status"
                                fullWidth
                                variant="standard"
                                value={formData.status}
                                onChange={handleChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                required
                                id="type"
                                name="type"
                                label="Type"
                                fullWidth
                                type="number"
                                variant="standard"
                                value={formData.type}
                                onChange={handleChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                required
                                id="stakeholderOriginId"
                                select
                                name="stakeholderOriginId"
                                label="Stakeholder Origin ID"
                                fullWidth
                                variant="standard"
                                value={formData.stakeholderOriginId}
                                onChange={handleChange}
                            >
                                {stakeholderList.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </ListItem>
                        <ListItem>
                            <TextField
                                required
                                id="stakeholderDestinationId"
                                select
                                name="stakeholderDestinationId"
                                label="Stakeholder Destination ID"
                                fullWidth
                                variant="standard"
                                value={formData.stakeholderOriginId}
                                onChange={handleChange}
                            >
                                {stakeholderList.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </ListItem>

                        <ListItem>
                            <TextField
                                required
                                id="payment"
                                name="payment"
                                label="Payment"
                                fullWidth
                                type="number"
                                variant="standard"
                                value={formData.payment}
                                onChange={handleChange}
                            />
                        </ListItem>
                        {/* You can add more fields here as needed */}
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
    );
};

export default InvoiceModal;
