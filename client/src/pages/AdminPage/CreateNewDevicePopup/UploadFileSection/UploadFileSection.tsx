import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, Typography } from '@mui/material';
import { PopupDeviceType } from '../CreateNewDevicePopup';

type PropsType = {
  device: PopupDeviceType;
  setDevice: (device: PopupDeviceType) => void;
};

const UploadFileSection: React.FC<PropsType> = ({ device, setDevice }) => {
  const [fileDataURL, setFileDataURL] = useState<string | undefined>(undefined);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDevice = { ...device };
    if (e.target.files) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const result = reader.result;
        setFileDataURL(result ? (result as string) : undefined);
      };
      reader.readAsDataURL(e.target.files[0]);
      newDevice.file = e.target.files[0];
    } else {
      setFileDataURL(undefined);
      newDevice.file = undefined;
    }
    setDevice(newDevice);
  };

  return (
    <Grid mt={{ xs: '1rem', md: '4rem' }}>
      <FormControl fullWidth>
        <Grid
          container
          display={'flex'}
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'start'}
          sx={{ alignItems: 'center' }}
        >
          {device.file ? (
            <>
              <Grid item xs={6} md={4}>
                <Box
                  component="img"
                  sx={{
                    height: 140,
                    width: 230,
                    marginRight: '2rem',
                    maxHeight: { xs: 70, md: 140 },
                    maxWidth: { xs: 115, md: 230 },
                    borderRadius: '6px',
                    boxShadow: '10',
                    objectFit: 'contain',
                  }}
                  alt="The house from the offer."
                  src={fileDataURL}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography
                  mr={'2rem'}
                  gutterBottom
                  variant="button"
                  component="div"
                  color="green"
                  textAlign={{ xs: 'center', md: 'start' }}
                  width={'100%'}
                >
                  {device.file.name}
                </Typography>
              </Grid>
            </>
          ) : (
            <Grid item xs={6} md={3}>
              <Typography
                mr={'2rem'}
                gutterBottom
                variant="button"
                component="div"
                color="red"
                textAlign={{ xs: 'center', md: 'start' }}
              >
                Файл не загружен
              </Typography>
            </Grid>
          )}
          <Grid
            item
            xs={device.file ? 12 : 6}
            md={3}
            display={'flex'}
            width={'100%'}
            justifyContent={{ xs: 'center', md: device.file ? 'center' : 'start' }}
            mt={{ xs: device.file ? '1rem' : '0', md: '0' }}
          >
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={onChangeFile}
            />
            <label htmlFor="raised-button-file">
              <Button variant={'outlined'} component="span" sx={{ textAlign: 'center' }}>
                {device.file ? 'Заменить файл' : 'Загрузить Файл'}
              </Button>
            </label>
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
  );
};

export default UploadFileSection;
