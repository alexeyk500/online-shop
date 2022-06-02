import React from 'react';
import { PopupDeviceType } from '../CreateNewDevicePopup';
import { FormControl, Grid, TextField } from '@mui/material';

type PropsType = {
  device: PopupDeviceType;
  setDevice: (device: PopupDeviceType) => void;
};

const DeviceNameSection: React.FC<PropsType> = ({ device, setDevice }) => {
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDevice = { ...device };
    newDevice.name = e.target.value;
    setDevice(newDevice);
  };

  return (
    <Grid mt={{ xs: '1rem', md: '2rem' }}>
      <FormControl fullWidth>
        <TextField
          value={device.name}
          onChange={onChangeName}
          margin="dense"
          id="deviceName"
          label={`Название Устройства`}
          type="text"
          fullWidth
          variant="standard"
        />
      </FormControl>
    </Grid>
  );
};

export default DeviceNameSection;
