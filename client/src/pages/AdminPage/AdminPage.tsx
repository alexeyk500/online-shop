import React, { useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import CreateTypePopUp from './CreateTypePopUp/CreateTypePopUp';

const AdminPage: React.FC = () => {
  const [isOpenNewTypePopup, setIsOpenNewTypePopup] = useState(false);

  const onClickCreateNewType = () => {
    setIsOpenNewTypePopup(true);
  };

  const onCloseIsOpenNewTypePopup = () => {
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
      <CreateTypePopUp isOpen={isOpenNewTypePopup} onClose={onCloseIsOpenNewTypePopup} />
    </Grid>
  );
};

export default AdminPage;
