import React from 'react';
import { DeviceType } from '../../../../../types/types';
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

type PropsType = {
  device: DeviceType;
  onClickDeleteDevice: (deviceId: string) => void;
};

const DeleteDeviceListItem: React.FC<PropsType> = ({ device, onClickDeleteDevice }) => {
  const onClickDelete = () => {
    onClickDeleteDevice(device.id);
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
          <Button variant={'outlined'} color="error" size="small" onClick={onClickDelete}>
            Удалить
          </Button>
        </Box>
      </CardContent>
      {/*<CardActions sx={{ display: 'flex', flexDirection: 'column' }}>*/}
      {/*  <Box*/}
      {/*    component={'div'}*/}
      {/*    sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '0.5rem', alignItems: 'start' }}*/}
      {/*  >*/}
      {/*    <Box component={'div'} sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>*/}
      {/*      <Button variant={'outlined'} color="error" size="small" sx={{ display: 'flex', marginRight: '1rem' }}>*/}
      {/*        Удалить*/}
      {/*      </Button>*/}
      {/*    </Box>*/}
      {/*  </Box>*/}
      {/*</CardActions>*/}
    </Card>
  );
};

export default DeleteDeviceListItem;
