import React from 'react';
import { useAppSelector } from '../../../../utils/hooks';
import { selectorDevices } from '../../../../store/deviceSlice';
import { Grid } from '@mui/material';
import EditOrDeleteDeviceListItem from './EditOrDeleteDeviceListItem/EditOrDeleteDeviceListItem';

type PropsType = {
  onClickEditOrDeleteDevice: (deviceId: string) => void;
  isEditPopUp?: boolean;
};

const EditOrDeleteDevicesList: React.FC<PropsType> = ({ onClickEditOrDeleteDevice, isEditPopUp }) => {
  const devices = useAppSelector(selectorDevices);

  return (
    <Grid container spacing={2} my={'1px'}>
      {devices.map((device) => (
        <Grid key={device.id} item xs={12} md={12} lg={12} style={{ display: 'flex', paddingBottom: '1rem' }}>
          <EditOrDeleteDeviceListItem
            device={device}
            onClickEditOrDeleteDevice={onClickEditOrDeleteDevice}
            isEditPopUp={isEditPopUp}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default EditOrDeleteDevicesList;
