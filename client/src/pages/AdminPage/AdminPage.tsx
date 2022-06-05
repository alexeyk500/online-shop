import React, { useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CreateTypeBrandPopUp from './CreateTypeBrandPopUp/CreateTypeBrandPopUp';
import CreateNewDevicePopup, { PopupDeviceType } from './CreateNewDevicePopup/CreateNewDevicePopup';
import { addNewDeviceTapesThunk } from '../../store/deviceSlice';
import { useAppDispatch } from '../../utils/hooks';

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
        dispatch(addNewDeviceTapesThunk(value));
      }
    }
  };

  const onClickShowDevicePopup = () => {
    SetIsShowDevicePopup(true);
  };

  const onCloseDevicePopup = (device: PopupDeviceType | undefined) => {
    if (device) {
      console.log('onCloseDevicePopup = ', device);
    }
    SetIsShowDevicePopup(false);
  };

  return (
    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="column">
          <Button variant="text" sx={{ marginTop: '3rem' }} onClick={onClickCreateNewType}>
            Добавить Тип
          </Button>
          <Button variant="text" sx={{ marginTop: '3rem' }} onClick={onClickCreateNewBrand}>
            Добавить Бренд
          </Button>
          <Button variant="text" sx={{ marginTop: '3rem' }} onClick={onClickShowDevicePopup}>
            Добавить Устройство
          </Button>
        </Stack>
      </Grid>
      <CreateTypeBrandPopUp
        typePopup={typePopup}
        onClosePopup={onCloseTypeBrandPopup}
        onAddNewItem={onAddNewItemTypeBrand}
      />
      <CreateNewDevicePopup isShow={isShowDevicePopup} onClose={onCloseDevicePopup} />
    </Grid>
  );
};

export default AdminPage;
