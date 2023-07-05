import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  message: string;
  handleClose: () => void;
}

const BasicModal: React.FC<BasicModalProps> = ({ message, handleClose }) => {
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {message}
        </Typography>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default BasicModal;
