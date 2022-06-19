import React, { useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CreateTypeBrandPopUp from './CreateTypeBrandPopUp/CreateTypeBrandPopUp';
import CreateNewDevicePopup, { PopupDeviceType } from './CreateNewDevicePopup/CreateNewDevicePopup';
import {
  addNewDeviceBrandThunk,
  addNewDeviceTapeThunk,
  deleteDeviceBrandThunk,
  deleteDeviceTapeThunk,
} from '../../store/deviceSlice';
import { useAppDispatch } from '../../utils/hooks';
import {serverApi} from "../../api/serverApi";

export enum TypePopupEnum {
  typePopup = 'typePopup',
  brandPopup = 'brandPopup',
}

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [typePopup, setTypePopup] = useState<TypePopupEnum | undefined>(undefined);
  const [isShowDevicePopup, SetIsShowDevicePopup] = useState<boolean>(false);

  const onClickCreateNewType = () => {
    setTypePopup(TypePopupEnum.typePopup);
  };

  const onClickCreateNewBrand = () => {
    setTypePopup(TypePopupEnum.brandPopup);
  };

  const onCloseTypeBrandPopup = () => {
    setTypePopup(undefined);
  };

  const onAddNewItemTypeBrand = (value: string) => {
    if (value) {
      if (typePopup === TypePopupEnum.typePopup) {
        dispatch(addNewDeviceTapeThunk(value));
      } else {
        dispatch(addNewDeviceBrandThunk(value));
      }
    }
  };

  const onDeleteItemTypeBrand = (id: string) => {
    if (id) {
      if (typePopup === TypePopupEnum.typePopup) {
        dispatch(deleteDeviceTapeThunk(id));
      } else {
        dispatch(deleteDeviceBrandThunk(id));
      }
    }
  };

  const onClickShowDevicePopup = () => {
    SetIsShowDevicePopup(true);
  };

  const addNewDevice = (device: PopupDeviceType) => {
    const formData = new FormData();
    device.name && formData.append('name', device.name)
    device.price && formData.append('price', device.price)
    device.file && formData.append('img', device.file)
    device.brandId && formData.append('brandId', device.brandId)
    device.typeId && formData.append('typeId', device.typeId)
    device.info && formData.append('info', JSON.stringify(device.info))
    // new Response(formData).text().then(console.log)
    return serverApi.createNewDevice(formData)
  }

  const onCloseDevicePopup = async (device: PopupDeviceType | undefined) => {
    if (device) {
      console.log('onCloseDevicePopup = ', device);
      const newDevice = await addNewDevice(device);
      console.log('newDevice =', newDevice)
    }
    SetIsShowDevicePopup(false);
  };

  return (
    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="column">
          <Button variant="text" sx={{ marginTop: '3rem' }} onClick={onClickCreateNewType}>
            Управление Типами
          </Button>
          <Button variant="text" sx={{ marginTop: '3rem' }} onClick={onClickCreateNewBrand}>
            Управление Брендами
          </Button>
          <Button variant="text" sx={{ marginTop: '3rem' }} onClick={onClickShowDevicePopup}>
            Управление Устройствами
          </Button>
        </Stack>
      </Grid>
      <CreateTypeBrandPopUp
        typePopup={typePopup}
        onClosePopup={onCloseTypeBrandPopup}
        onAddNewItem={onAddNewItemTypeBrand}
        onDeleteItem={onDeleteItemTypeBrand}
      />
      <CreateNewDevicePopup isShow={isShowDevicePopup} onClose={onCloseDevicePopup} />
    </Grid>
  );
};

export default AdminPage;
