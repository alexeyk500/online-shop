import React from 'react';
import { Grid } from '@mui/material';
import { useAppSelector } from '../../../utils/hooks';
import { selectorDevices } from '../../../store/deviceSlice';
import DeviceListItem from './DeviceListItem/DeviceListItem';

const DeviceList: React.FC = () => {
  const devices = useAppSelector(selectorDevices);

  return (
    <Grid container alignItems="stretch" spacing={2} my={'1px'}>
      {devices.map((device) => (
        <Grid item xs={12} md={6} lg={3} style={{ display: 'flex', paddingBottom:'1rem' }}>
          <DeviceListItem device={device} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DeviceList;
