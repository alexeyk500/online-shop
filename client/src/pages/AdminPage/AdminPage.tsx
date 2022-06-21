import React, { useState } from 'react';
import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import CreateTypeBrandPopUp from './CreateTypeBrandPopUp/CreateTypeBrandPopUp';
import CreateNewDevicePopup, { PopupDeviceType } from './CreateNewDevicePopup/CreateNewDevicePopup';
import {
  addNewDeviceBrandThunk,
  addNewDeviceTapeThunk,
  deleteDeviceBrandThunk,
  deleteDeviceByIdThunk,
  deleteDeviceTapeThunk,
} from '../../store/deviceSlice';
import { useAppDispatch } from '../../utils/hooks';
import { serverApi } from '../../api/serverApi';
import DeleteDevicePopup from './DeleteDevicePopup/DeleteDevicePopup';

export enum TypePopupEnum {
  typePopup = 'typePopup',
  brandPopup = 'brandPopup',
}

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [typePopup, setTypePopup] = useState<TypePopupEnum | undefined>(undefined);
  const [isShowDevicePopup, setIsShowDevicePopup] = useState<boolean>(false);
  const [isShowDeleteDevicePopup, setIsShowDeleteDevicePopup] = useState<boolean>(false);

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
    setIsShowDevicePopup(true);
  };

  const onClickEditDevicePopup = () => {
    console.log('Will edit device');
  };

  const addNewDevice = (device: PopupDeviceType) => {
    const formData = new FormData();
    device.name && formData.append('name', device.name);
    device.price && formData.append('price', device.price);
    device.file && formData.append('img', device.file);
    device.brandId && formData.append('brandId', device.brandId);
    device.typeId && formData.append('typeId', device.typeId);
    device.info && formData.append('info', JSON.stringify(device.info));
    return serverApi.createNewDevice(formData);
  };

  const onCloseDevicePopup = async (device: PopupDeviceType | undefined) => {
    if (device) {
      await addNewDevice(device);
    }
    setIsShowDevicePopup(false);
  };

  const onClickShowDeleteDevicePopup = () => {
    setIsShowDeleteDevicePopup(true);
  };

  const onCloseShowDeleteDevicePopup = (
    deviceId: string | undefined,
    params?: { typeId?: string; brandId?: string }
  ) => {
    if (deviceId) {
      dispatch(deleteDeviceByIdThunk({ id: deviceId, params: { typeId: params?.typeId, brandId: params?.brandId } }));
    } else {
      setIsShowDeleteDevicePopup(false);
    }
  };

  return (
    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="column">
          <Card
            sx={{
              margin: '3rem 0 1.5rem 0',
              padding: 2,
              boxShadow: 5,
              borderRadius: '6px',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Button variant="text" sx={{ margin: '2rem 0' }} onClick={onClickCreateNewType}>
              Управление Типами
            </Button>
          </Card>
          <Card
            sx={{
              margin: '1.5rem 0',
              padding: 2,
              boxShadow: 5,
              borderRadius: '6px',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Button variant="text" sx={{ margin: '2rem 0' }} onClick={onClickCreateNewBrand}>
              Управление Брендами
            </Button>
          </Card>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              margin: '1.5rem 0',
              padding: 2,
              boxShadow: 5,
              borderRadius: '6px',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" color="primary">
                Управление Устройствами
              </Typography>
              <Divider />
              <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant="text" sx={{ margin: '1rem 0 0.5rem 0' }} onClick={onClickShowDevicePopup}>
                  Добавить Устройство
                </Button>
                <Button variant="text" sx={{ margin: '0.5rem 0' }} onClick={onClickEditDevicePopup}>
                  Редактировать Устройство
                </Button>
                <Button variant="text" sx={{ marginTop: '0.5rem' }} onClick={onClickShowDeleteDevicePopup}>
                  Удалить Устройство
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
      <CreateTypeBrandPopUp
        typePopup={typePopup}
        onClosePopup={onCloseTypeBrandPopup}
        onAddNewItem={onAddNewItemTypeBrand}
        onDeleteItem={onDeleteItemTypeBrand}
      />
      <CreateNewDevicePopup isShow={isShowDevicePopup} onClose={onCloseDevicePopup} />
      <DeleteDevicePopup isOpen={isShowDeleteDevicePopup} onClosePopup={onCloseShowDeleteDevicePopup} />
    </Grid>
  );
};

export default AdminPage;
