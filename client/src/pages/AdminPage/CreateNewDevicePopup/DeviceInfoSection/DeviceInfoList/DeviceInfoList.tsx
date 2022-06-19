import React from 'react';
import { Grid, Typography } from '@mui/material';
import { DeviceInfoType } from '../../../../../types/types';
import DeviceInfoListItem from './DeviceInfoListItem/DeviceInfoListItem';

type PropsType = {
  deviceInfoList: DeviceInfoType[];
  deleteDeviceInfo: (id: string) => void;
  onChangeDeviceInfo: (newInfo: DeviceInfoType) => void;
};

const DeviceInfoList: React.FC<PropsType> = ({ deviceInfoList, deleteDeviceInfo, onChangeDeviceInfo }) => {
  if (deviceInfoList.length === 0) {
    return null;
  }
  return (
    <Grid
      item
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      justifyContent={'center'}
      mt={{ xs: '0.5rem', md: '1rem' }}
    >
      <Typography variant="h6" component="div" textAlign={'center'} color={'text.secondary'}>
        {'Характеристики Устройства'}
      </Typography>
      {deviceInfoList.map((deviceInfo) => (
        <DeviceInfoListItem
          key={deviceInfo.id}
          deviceInfo={deviceInfo}
          deleteDeviceInfo={deleteDeviceInfo}
          onChangeDeviceInfo={onChangeDeviceInfo}
        />
      ))}
    </Grid>
  );
};

export default DeviceInfoList;
