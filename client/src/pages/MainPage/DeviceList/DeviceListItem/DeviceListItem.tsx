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
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '100%',
        boxShadow: 5,
        borderRadius: '12px',
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
          <Button size="small">В корзину</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default DeviceListItem;
