import React from 'react';
import {Box, Grid} from '@mui/material';
import { useAppSelector } from '../../../utils/hooks';
import { selectorDevices } from '../../../store/deviceSlice';
import DeviceListItem from './DeviceListItem/DeviceListItem';

const DeviceList: React.FC = () => {
  const devices = useAppSelector(selectorDevices);

  return (
    <Grid container spacing={2} mb={'1rem'} pr={'1rem'}>
      {devices.map((device) => (
        <DeviceListItem key={device.id} device={device} />
      ))}
    </Grid>
  );
};

export default DeviceList;
