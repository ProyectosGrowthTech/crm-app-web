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

interface AddAddressModalProps {
    open: boolean;
    onClose: () => void;
    handleSave: () => void;
    formData: {
        addressName: string;
        addressLine: string;
        city: string;
        postalCode: string;
        country: string;
        state: string;
    };
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
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

const AddAddressModal: React.FC<AddAddressModalProps> = ({ open, onClose, handleSave, formData, handleChange }) => {
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
                                label="Address Line"
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
                                label="Zip / Postal Code"
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

export default AddAddressModal;
