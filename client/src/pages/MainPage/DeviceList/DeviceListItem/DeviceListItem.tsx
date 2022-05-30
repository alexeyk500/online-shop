import React from 'react';
import { DeviceType } from '../../../../types/types';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';

type PropsType = {
  device: DeviceType;
};

const DeviceListItem: React.FC<PropsType> = ({ device }) => {
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
          height="140"
          image={device.img}
          alt={device.name}
          sx={{
            '&.MuiCardMedia-img': {
              objectFit: 'contain',
            },
          }}
        />
        <Box component={'div'}>
          <Typography gutterBottom variant="h6" component="div">
            {device.name}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          component={'div'}
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '0.5rem', alignItems: 'start' }}
        >
          <Typography component="legend">Рейтинг</Typography>
          <Rating value={Number(device.rating) ?? 0} readOnly />
        </Box>
        <Box
          component={'div'}
          sx={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '0.5rem', alignItems: 'start' }}
        >
          <Box component={'div'} sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <Button variant={'text'} size="small" sx={{ display: 'flex', fontSize: '12px' }}>
              Подробнее
            </Button>
            <Button variant={'outlined'} size="small" sx={{ display: 'flex', marginRight: '1rem' }}>
              В корзину
            </Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default DeviceListItem;
