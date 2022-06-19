import React from 'react';
import { PopupDeviceType } from '../CreateNewDevicePopup';
import { FormControl, Grid, TextField } from '@mui/material';

type PropsType = {
  device: PopupDeviceType;
  setDevice: (device: PopupDeviceType) => void;
};

const DevicePriceSection: React.FC<PropsType> = ({ device, setDevice }) => {
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDevice = { ...device };
    newDevice.price = e.target.value;
    setDevice(newDevice);
  };

  return (
    <Grid mt={{ xs: '1rem', md: '2rem' }}>
      <FormControl fullWidth>
        <TextField
          value={device.price}
          onChange={onChangePrice}
          margin="dense"
          id="devicePrice"
          label={`Цена Устройства`}
          type="tel"
          fullWidth
          variant="standard"
        />
      </FormControl>
    </Grid>
  );
};

export default DevicePriceSection;
