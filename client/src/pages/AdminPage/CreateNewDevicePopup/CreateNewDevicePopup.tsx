import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DeviceType } from '../../../types/types';

import DeviceInfoSection from './DeviceInfoSection/DeviceInfoSection';
import UploadFileSection from './UploadFileSection/UploadFileSection';
import SelectTypeSection from './SelectTypeSection/SelectTypeSection';
import SelectBrandSection from './SelectBrandSection/SelectBrandSection';
import DeviceNameSection from './DeviceNameSection/DeviceNameSection';
import DevicePriceSection from './DevicePriceSection/DevicePriceSection';

type PropsType = {
  isShow: boolean;
  onClose: (device: PopupDeviceType | undefined) => void;
};

export type PopupDeviceType = DeviceType & {
  file: File | undefined;
};

const getNewDevice = (): PopupDeviceType => {
  return {
    id: '-1',
    name: '',
    price: '',
    img: '',
    rating: '',
    typeId: '',
    brandId: '',
    info: [],
    file: undefined,
  };
};

const CreateNewDevicePopup: React.FC<PropsType> = ({ isShow, onClose }) => {
  const [device, setDevice] = useState(getNewDevice());

  useEffect(() => {
    setDevice(getNewDevice());
  }, [isShow]);

  const onClickConfirm = () => {
    onClose(device);
  };

  const onClickCancel = () => {
    onClose(undefined);
  };

  const isFormFullFilled = () => {
    return !!(
      device.name &&
      device.name.length > 0 &&
      device.price &&
      device.name.length > 0 &&
      device.typeId &&
      device.brandId &&
      device.file
    );
  };

  return (
    <Dialog maxWidth={'md'} open={isShow} onClose={onClickCancel}>
      <DialogTitle width={'70vw'}>{`Панель добавления нового устройства`}</DialogTitle>
      <DialogContent>
        <SelectTypeSection device={device} setDevice={setDevice} />
        <SelectBrandSection device={device} setDevice={setDevice} />
        <DeviceNameSection device={device} setDevice={setDevice} />
        <DevicePriceSection device={device} setDevice={setDevice} />
        <UploadFileSection device={device} setDevice={setDevice} />
        <DeviceInfoSection device={device} setDevice={setDevice} />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClickCancel}>
          Отмена
        </Button>
        <Button color="success" onClick={onClickConfirm} disabled={!isFormFullFilled()}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewDevicePopup;
