import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, Typography } from '@mui/material';

type PropsType = {
  imgFile: File | undefined;
  setImgFile: (imgFile: File | undefined) => void;
};

const UploadFileSection: React.FC<PropsType> = ({ imgFile, setImgFile }) => {
  const [fileDataURL, setFileDataURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const result = reader.result;
        setFileDataURL(result ? (result as string) : undefined);
      };
      reader.readAsDataURL(imgFile);
    }
  }, [imgFile]);

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgFile(e.target.files[0]);
    } else {
      setImgFile(undefined);
    }
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
          {imgFile ? (
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
                  {imgFile.name}
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
            xs={imgFile ? 12 : 6}
            md={3}
            display={'flex'}
            width={'100%'}
            justifyContent={{ xs: 'center', md: imgFile ? 'center' : 'start' }}
            mt={{ xs: imgFile ? '1rem' : '0', md: '0' }}
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
                {imgFile ? 'Заменить файл' : 'Загрузить Файл'}
              </Button>
            </label>
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
  );
};

export default UploadFileSection;
