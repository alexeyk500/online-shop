import React, { useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CreateTypeBrandPopUp from './CreateTypeBrandPopUp/CreateTypeBrandPopUp';

enum TypePopupEnum {
  typePopup = 'typePopup',
  brandPopup = 'brandPopup'
}

const AdminPage: React.FC = () => {

  const [typePopup, setTypePopup] = useState<TypePopupEnum | undefined>(undefined);

  const onClickCreateNewType = () => {
    setTypePopup(TypePopupEnum.typePopup);
  };

  const onCloseTypePopup = () => {
    setIsOpenNewTypePopup(false);
  };

  const onClickCreateNewBrand = () => {
    setIsOpenNewTypePopup(true);
  };

  const onCloseIsOpenNewBrandPopup = () => {
    setIsOpenNewTypePopup(false);
  };

  return (
    <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack direction="column">
          <Button variant="text" sx={{ marginTop: '3rem' }} onClick={onClickCreateNewType}>
            Добавить Тип
          </Button>
          <Button variant="text" sx={{ marginTop: '3rem' }}>
            Добавить Бренд
          </Button>
          <Button variant="text" sx={{ marginTop: '3rem' }}>
            Добавить Устройство
          </Button>
        </Stack>
      </Grid>
      <CreateTypeBrandPopUp isOpenTypePopup={isOpenNewTypePopup} onCloseTypePopup={onCloseTypePopup} />
    </Grid>
  );
};

export default AdminPage;
