import React from 'react';
import { Modal } from '@mui/material';
const CustomModal = ({ open, handleClose, children }) => {
  return (
    <div>
      <Modal open={open} onClose={() => handleClose()}>
        {children}
      </Modal>
    </div>
  );
};

export default CustomModal;
