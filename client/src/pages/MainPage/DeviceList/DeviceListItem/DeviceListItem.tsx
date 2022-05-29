import React from 'react';
import { DeviceType } from '../../../../types/types';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';

type PropsType = {
  device: DeviceType;
};

const DeviceListItem: React.FC<PropsType> = ({ device }) => {
  return (
    <Grid item xs={12} md={3}>
      <Card sx={{boxShadow: 5, borderRadius: '12px', height:'100%'}} >
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
          <Typography gutterBottom variant="h6" component="div">
            {device.name}
          </Typography>
          <Typography component="legend">Рейтинг</Typography>
          <Rating value={Number(device.rating) ?? 0} readOnly />
        </CardContent>
        <CardActions>
          <Button size="small">В корзину</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default DeviceListItem;
