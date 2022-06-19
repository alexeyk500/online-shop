import React, {useEffect} from 'react';
import { Box, Button, Card, CardActions, CardContent, Grid, Rating, Typography } from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {getDeviceByIdThunk, selectorSelectedDevice} from '../../store/deviceSlice';
import { useParams } from 'react-router-dom';

const DevicePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(()=>{
    if (id) {
      dispatch(getDeviceByIdThunk(id))
    }
  },[id])

  const device = useAppSelector(selectorSelectedDevice);

  console.log('id =', id);
  console.log('device =', device);

  // const descriptions = [
  //   { id: 1, title: 'Оперативная память', description: '5 гб.' },
  //   { id: 2, title: 'Видео память', description: '2 гб.' },
  //   { id: 3, title: 'Количество ядер процессора', description: '4' },
  //   { id: 4, title: 'Производитель', description: 'Apple' },
  //   { id: 5, title: 'Оперативная память', description: '5 гб.' },
  //   { id: 6, title: 'Видео память', description: '2 гб.' },
  //   { id: 7, title: 'Количество ядер процессора', description: '4' },
  //   { id: 8, title: 'Производитель', description: 'Apple' },
  // ];

  return (
    <>
      { device &&
        <>
          <Box my={2} sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {device.name}
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={12} md={6} display={'flex'} justifyContent="center" alignItems="center">
              <Box
                component="img"
                sx={{
                  height: 450,
                  maxHeight: { xs: 250, md: 350 },
                  display: 'inline-block',
                  borderRadius: '12px',
                  boxShadow: 12,
                }}
                alt={device.name}
                src={device.img}
              />
            </Grid>

            <Grid item xs={12} md={4} display={'flex'} flexDirection={'column'} justifyContent="center" alignItems="center">
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                mt={{ xs: '2rem' }}
                mb={{ xs: '2rem', md: '5rem' }}
              >
                <Typography variant="h5" component="legend">
                  Ваша Оценка
                </Typography>
                <Rating value={0} readOnly />
              </Box>
              <Box display={'flex'} flexDirection={'column'} alignItems={'center'} mb={{ xs: '2rem' }}>
                <Typography variant="h5" component="legend">
                  Общий Рейтинг
                </Typography>
                <Rating value={Number(device.rating) ?? 0} readOnly />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={2}
              pb={{ xs: '2rem', md: 0 }}
              display={'flex'}
              flexDirection={'column'}
              justifyContent="center"
              alignItems="center"
            >
              <Card sx={{ padding: 2, boxShadow: 5, borderRadius: '6px' }}>
                <CardContent>
                  <Grid display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Typography gutterBottom variant="h5" component="div" color="primary">
                      Цена:
                    </Typography>
                    <Typography variant="h6" component="div">
                      {`${device.price} руб.`}
                    </Typography>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button variant="outlined" size="medium" sx={{ marginBottom: 1 }}>
                    В корзину
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          {
            !!device.info.length &&
            <>
              <Grid my={2} display={'flex'} justifyContent={'center'}>
                <Typography gutterBottom variant="h4" component="div">
                  Характеристики
                </Typography>
              </Grid>
              {device.info.map((description, ind) => {
                return (
                  <Grid key={ind} sx={{ backgroundColor: ind % 2 === 0 ? 'background' : 'lightGray' }}>
                    <Typography mb={'0'} gutterBottom variant="subtitle1" component="div" sx={{}}>
                      {`${description.title}:${description.description}`}
                    </Typography>
                  </Grid>
                );
              })}
            </>
          }
        </>
      }
    </>
  );
};

export default DevicePage;
