import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DeviceType } from '../../../types/types';

import DeviceInfoSection from './DeviceInfoSection/DeviceInfoSection';
import UploadFileSection from './UploadFileSection/UploadFileSection';
import SelectTypeSection from './SelectTypeSection/SelectTypeSection';
import SelectBrandSection from './SelectBrandSection/SelectBrandSection';
import DeviceNameSection from './DeviceNameSection/DeviceNameSection';
import DevicePriceSection from './DevicePriceSection/DevicePriceSection';
import { getDeviceByIdThunk, resetSelectedDevice, selectorSelectedDevice } from '../../../store/deviceSlice';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

type PropsType = {
  isShowDeviceId: string | undefined;
  onClose: (device: DeviceType | undefined, file?: File) => void;
};

const getNewDevice = (): DeviceType => {
  return {
    id: '-1',
    name: '',
    price: '',
    img: '',
    rating: '',
    typeId: '',
    brandId: '',
    info: [],
  };
};

const CreateNewDevicePopup: React.FC<PropsType> = ({ isShowDeviceId, onClose }) => {
  const dispatch = useAppDispatch();
  const selectedDevice = useAppSelector(selectorSelectedDevice);

  const [device, setDevice] = useState(getNewDevice());
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (selectedDevice && selectedDevice.img && !imgFile) {
      fetch(selectedDevice.img)
        .then((res) => res.blob())
        .then((blob) => {
          const newFile = new File([blob], selectedDevice.img!.split('/').pop() ?? 'image.jpg', {
            type: blob.type,
          });
          console.log(newFile);
          setImgFile(newFile);
        });
    }
    // eslint-disable-next-line
  }, [device]);

  useEffect(() => {
    if (isShowDeviceId === '-1') {
      setDevice(getNewDevice());
    } else {
      if (isShowDeviceId) {
        dispatch(getDeviceByIdThunk(isShowDeviceId));
        setDevice(getNewDevice());
      }
    }
    // eslint-disable-next-line
  }, [isShowDeviceId]);

  const onClickConfirm = () => {
    setImgFile(undefined);
    dispatch(resetSelectedDevice());
    onClose(device, imgFile);
  };

  const onClickCancel = () => {
    setImgFile(undefined);
    dispatch(resetSelectedDevice());
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
      imgFile
    );
  };

  useEffect(() => {
    if (selectedDevice) {
      setDevice(selectedDevice);
    }
  }, [selectedDevice]);

  return (
    <Dialog maxWidth={'md'} open={!!isShowDeviceId} onClose={onClickCancel}>
      <DialogTitle width={'70vw'}>
        {isShowDeviceId === '-1' ? `Панель добавления нового устройства` : `Панель редактирования устройства`}
      </DialogTitle>
      <DialogContent>
        <SelectTypeSection device={device} setDevice={setDevice} />
        <SelectBrandSection device={device} setDevice={setDevice} />
        <DeviceNameSection device={device} setDevice={setDevice} />
        <DevicePriceSection device={device} setDevice={setDevice} />
        <UploadFileSection imgFile={imgFile} setImgFile={setImgFile} />
        <DeviceInfoSection device={device} setDevice={setDevice} />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClickCancel}>
          Отмена
        </Button>
        <Button color="success" onClick={onClickConfirm} disabled={!isFormFullFilled()}>
          {isShowDeviceId === '-1' ? 'Создать' : 'Редактировать'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewDevicePopup;
