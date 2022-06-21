import React from 'react';
import { DeviceType } from '../../../../../types/types';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

type PropsType = {
  device: DeviceType;
  onClickEditOrDeleteDevice: (deviceId: string) => void;
  isEditPopUp?: boolean;
};

const EditOrDeleteDeviceListItem: React.FC<PropsType> = ({ device, onClickEditOrDeleteDevice, isEditPopUp }) => {
  const onClickDelete = () => {
    onClickEditOrDeleteDevice(device.id);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        borderRadius: '12px',
        boxShadow: 5,
      }}
    >
      <CardContent>
        <CardMedia
          component="img"
          height="80"
          image={device.img}
          alt={device.name}
          sx={{
            '&.MuiCardMedia-img': {
              objectFit: 'contain',
            },
          }}
        />
        <Box component={'div'}>
          <Typography gutterBottom variant="h6" component="div" textAlign={'center'}>
            {device.name}
          </Typography>
        </Box>
        <Box component={'div'} sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          <Button variant={'outlined'} color={isEditPopUp ? 'primary' :'error'} size="small" onClick={onClickDelete}>
            {isEditPopUp ? 'Редактировать' : 'Удалить'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EditOrDeleteDeviceListItem;
