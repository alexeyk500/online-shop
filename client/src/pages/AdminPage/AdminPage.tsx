import React, { useState } from 'react';
import { Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import CreateTypeBrandPopUp from './CreateTypeBrandPopUp/CreateTypeBrandPopUp';
import CreateNewDevicePopup from './CreateNewDevicePopup/CreateNewDevicePopup';
import {
  addNewDeviceBrandThunk,
  addNewDeviceTapeThunk,
  deleteDeviceBrandThunk,
  deleteDeviceByIdThunk,
  deleteDeviceTapeThunk,
} from '../../store/deviceSlice';
import { useAppDispatch } from '../../utils/hooks';
import { serverApi } from '../../api/serverApi';
import EditOrDeleteDevicePopup from './EditOrDeleteDevicePopup/EditOrDeleteDevicePopup';
import { DeviceType } from '../../types/types';

export enum TypePopupEnum {
  typePopup = 'typePopup',
  brandPopup = 'brandPopup',
}

export enum EditOrDeleteDevicePopupEnum {
  editPopup = 'editPopup',
  deletePopup = 'deletedPopup',
}

const addNewDevice = (device: DeviceType, file: File) => {
  const formData = new FormData();
  device.name && formData.append('name', device.name);
  device.price && formData.append('price', device.price);
  device.brandId && formData.append('brandId', device.brandId);
  device.typeId && formData.append('typeId', device.typeId);
  device.info && formData.append('info', JSON.stringify(device.info));
  file && formData.append('img', file);
  return serverApi.createNewDevice(formData);
};

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [typePopup, setTypePopup] = useState<TypePopupEnum | undefined>(undefined);
  const [isShowDevicePopup, setIsShowDevicePopup] = useState<string | undefined>(undefined);
  const [isShowEditOrDeleteDevicePopup, setIsShowEditOrDeleteDevicePopup] = useState<
    EditOrDeleteDevicePopupEnum | undefined
  >(undefined);

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

  const onClickAddNewDevice = () => {
    setIsShowDevicePopup('-1');
  };

  const onCloseDevicePopup = async (device: DeviceType | undefined, file: File | undefined) => {
    if (device && file) {
      if (device.id === '-1') {
        await addNewDevice(device, file);
      } else {
        console.log('will edit device');
      }
    }
    setIsShowDevicePopup(undefined);
  };

  const onClickShowDeleteDevicePopup = () => {
    setIsShowEditOrDeleteDevicePopup(EditOrDeleteDevicePopupEnum.deletePopup);
  };

  const onCloseShowDeleteDevicePopup = (
    deviceId: string | undefined,
    params?: { typeId?: string; brandId?: string }
  ) => {
    if (isShowEditOrDeleteDevicePopup === EditOrDeleteDevicePopupEnum.editPopup) {
      if (deviceId) {
        console.log('will edit device Thunk deviceId =', deviceId);
        setIsShowDevicePopup(deviceId);
      } else {
        setIsShowEditOrDeleteDevicePopup(undefined);
      }
    } else {
      if (deviceId) {
        dispatch(deleteDeviceByIdThunk({ id: deviceId, params: { typeId: params?.typeId, brandId: params?.brandId } }));
      } else {
        setIsShowEditOrDeleteDevicePopup(undefined);
      }
    }
  };

  const onClickEditDevicePopup = () => {
    setIsShowEditOrDeleteDevicePopup(EditOrDeleteDevicePopupEnum.editPopup);
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
              ???????????????????? ????????????
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
              ???????????????????? ????????????????
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
                ???????????????????? ????????????????????????
              </Typography>
              <Divider />
              <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant="text" sx={{ margin: '1rem 0 0.5rem 0' }} onClick={onClickAddNewDevice}>
                  ???????????????? ????????????????????
                </Button>
                <Button variant="text" sx={{ margin: '0.5rem 0' }} onClick={onClickEditDevicePopup}>
                  ?????????????????????????? ????????????????????
                </Button>
                <Button variant="text" sx={{ marginTop: '0.5rem' }} onClick={onClickShowDeleteDevicePopup}>
                  ?????????????? ????????????????????
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
      <CreateNewDevicePopup isShowDeviceId={isShowDevicePopup} onClose={onCloseDevicePopup} />
      <EditOrDeleteDevicePopup
        isOpen={!!isShowEditOrDeleteDevicePopup}
        onClosePopup={onCloseShowDeleteDevicePopup}
        isEditPopUp={isShowEditOrDeleteDevicePopup === EditOrDeleteDevicePopupEnum.editPopup}
      />
    </Grid>
  );
};

export default AdminPage;
