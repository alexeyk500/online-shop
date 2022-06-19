import React from 'react';
import DeviceInfoList from './DeviceInfoList/DeviceInfoList';
import { Button, Grid } from '@mui/material';
import { PopupDeviceType } from '../CreateNewDevicePopup';
import { DeviceInfoType } from '../../../../types/types';

type PropsType = {
  device: PopupDeviceType;
  setDevice: (device: PopupDeviceType) => void;
};

const DeviceInfoSection: React.FC<PropsType> = ({ device, setDevice }) => {
  const addDeviceInfo = () => {
    const newDevice = { ...device };
    newDevice.info = [...device.info, { id: Date.now().toString(), title: '', description: '' }];
    setDevice(newDevice);
  };

  const deleteDeviceInfo = (id: string) => {
    const newDevice = { ...device };
    newDevice.info = device.info.filter((deviceInfo) => deviceInfo.id !== id);
    setDevice(newDevice);
  };

  const onChangeDeviceInfo = (newInfo: DeviceInfoType) => {
    const newDevice = { ...device };
    const infoInd = device.info.findIndex((deviceInfo) => deviceInfo.id === newInfo.id);
    if (infoInd > -1) {
      newDevice.info[infoInd] = newInfo;
      setDevice(newDevice);
    }
  };

  return (
    <>
      <DeviceInfoList
        deviceInfoList={device.info}
        deleteDeviceInfo={deleteDeviceInfo}
        onChangeDeviceInfo={onChangeDeviceInfo}
      />
      <Grid item display={'flex'} width={'100%'} justifyContent={'center'} mt={{ xs: '1rem', md: '2rem' }}>
        <Button variant={'outlined'} component="span" sx={{ textAlign: 'center' }} onClick={addDeviceInfo}>
          {'Добавить Характеристику'}
        </Button>
      </Grid>
    </>
  );
};

export default DeviceInfoSection;
