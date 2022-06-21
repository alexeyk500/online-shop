import React from 'react';
import { useAppSelector } from '../../../../utils/hooks';
import { selectorDevices } from '../../../../store/deviceSlice';
import { Grid } from '@mui/material';
import DeleteDeviceListItem from './DeleteDeviceListItem/DeleteDeviceListItem';

type PropsType = {
  onClickDeleteDevice: (deviceId: string) => void;
};

const DeleteDevicesList: React.FC<PropsType> = ({ onClickDeleteDevice }) => {
  const devices = useAppSelector(selectorDevices);

  return (
    <Grid container spacing={2} my={'1px'}>
      {devices.map((device) => (
        <Grid key={device.id} item xs={12} md={12} lg={12} style={{ display: 'flex', paddingBottom: '1rem' }}>
          <DeleteDeviceListItem device={device} onClickDeleteDevice={onClickDeleteDevice} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DeleteDevicesList;
