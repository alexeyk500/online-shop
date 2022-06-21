import React, { useEffect, useState } from 'react';
import { DeviceInfoType } from '../../../../../../types/types';
import { Button, FormControl, Grid, TextField } from '@mui/material';

type PropsType = {
  deviceInfo: DeviceInfoType;
  deleteDeviceInfo: (id: string) => void;
  onChangeDeviceInfo: (newInfo: DeviceInfoType) => void;
};

const DeviceInfoListItem: React.FC<PropsType> = ({ deviceInfo, deleteDeviceInfo, onChangeDeviceInfo }) => {
  const [title, setTitle] = useState(deviceInfo.title);
  const [description, setDescription] = useState(deviceInfo.description);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onClickDeleteDeviceInfo = () => {
    deleteDeviceInfo(deviceInfo.id);
  };

  useEffect(() => {
    onChangeDeviceInfo({ id: deviceInfo.id, title, description });
    // eslint-disable-next-line
  }, [title, description]);

  return (
    <Grid item display={{ md: 'flex' }} width={{ md: '100%' }} mt={{ xs: '0.25rem', md: 0 }}>
      <Grid item xs={12} md={4} mr={'1rem'} width={{ xs: '100%' }}>
        <FormControl fullWidth>
          <TextField
            value={title}
            onChange={onChangeTitle}
            margin="dense"
            id="deviceInfoTitle"
            label={`Название Характеристики`}
            type="text"
            fullWidth
            variant="standard"
            size="small"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6} width={{ xs: '100%' }}>
        <FormControl fullWidth>
          <TextField
            value={description}
            onChange={onChangeDescription}
            margin="dense"
            id="deviceInfoDescription"
            label={`Описание`}
            type="text"
            fullWidth
            variant="standard"
            size="small"
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={2}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={{ xs: '0.5rem', md: 0 }}
      >
        <Button
          variant={'outlined'}
          size={'small'}
          component="span"
          sx={{ textAlign: 'center' }}
          onClick={onClickDeleteDeviceInfo}
        >
          {'Удалить'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default DeviceInfoListItem;
