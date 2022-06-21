import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

type PropsType = {
  isOpen: boolean;
  onClosePopup: (deviceId: string | undefined) => void;
};

const DeleteDevicePopup: React.FC<PropsType> = ({ isOpen, onClosePopup }) => {
  const onClickCancel = () => {
    onClosePopup(undefined);
  };

  const onClickDelete = () => {
    const isDelete = window.confirm('Удалить устройсво?');
    if (isDelete) {
      onClosePopup('device_ID');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClickCancel}>
      <DialogTitle>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Панель удаления устройств
        </Typography>
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClickCancel}>
          Отмена
        </Button>
        <Button color="success" onClick={onClickDelete}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDevicePopup;
