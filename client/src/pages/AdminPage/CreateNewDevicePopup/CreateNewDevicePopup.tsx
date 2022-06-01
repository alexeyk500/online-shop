import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { DeviceType } from '../../../types/types';
import { useAppSelector } from '../../../utils/hooks';
import { selectorBrands, selectorTypes } from '../../../store/deviceSlice';

type PropsType = {
  isShow: boolean;
  onClose: (device: PopupDeviceType | undefined) => void;
};

export type PopupDeviceType = DeviceType & {
  file: File | undefined;
};

const getNewDevice = (): PopupDeviceType => {
  return {
    id: '-1',
    name: '',
    price: '',
    img: '',
    rating: '',
    typeId: '',
    brandId: '',
    file: undefined,
  };
};

const CreateNewDevicePopup: React.FC<PropsType> = ({ isShow, onClose }) => {
  const types = useAppSelector(selectorTypes);
  const brands = useAppSelector(selectorBrands);

  const [device, setDevice] = useState(getNewDevice());

  const [fileDataURL, setFileDataURL] = useState<string | undefined>(undefined);

  useEffect(() => {
    setDevice(getNewDevice());
  }, [isShow]);

  const onClickConfirm = () => {
    onClose(device);
  };

  const onClickCancel = () => {
    onClose(undefined);
  };

  const onChangeType = (e: SelectChangeEvent) => {
    const newDevice = { ...device };
    newDevice.typeId = e.target.value;
    setDevice(newDevice);
  };

  const onChangeBrand = (e: SelectChangeEvent) => {
    const newDevice = { ...device };
    newDevice.brandId = e.target.value;
    setDevice(newDevice);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDevice = { ...device };
    newDevice.name = e.target.value;
    setDevice(newDevice);
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const newDevice = { ...device };
    newDevice.price = e.target.value;
    setDevice(newDevice);
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      const newDevice = { ...device };
      newDevice.file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = function () {
        const result = reader.result;
        setFileDataURL(result ? (result as string) : undefined);
      };
      reader.readAsDataURL(e.target.files[0]);

      setDevice(newDevice);
    }
  };

  const isFormFullFilled = () => {
    return !!(
      device.name &&
      device.name.length > 0 &&
      device.price &&
      device.name.length > 0 &&
      device.typeId &&
      device.brandId &&
      device.file
    );
  };

  return (
    <Dialog maxWidth={'md'} open={isShow} onClose={onClickCancel}>
      <DialogTitle width={'70vw'}>{`Панель добавления нового устройства`}</DialogTitle>
      <DialogContent>
        <Grid mt={{ xs: '0.5rem', md: '1rem' }}>
          <FormControl fullWidth>
            <InputLabel id="selectType">{'Тип устройства'}</InputLabel>
            <Select
              labelId="selectType"
              id="selectForType"
              value={device.typeId}
              label={'Тип устройства'}
              onChange={onChangeType}
            >
              {types.map((type) => {
                return (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid mt={{ xs: '1rem', md: '2rem' }}>
          <FormControl fullWidth>
            <InputLabel id="selectBrand">{'Бренд устройства'}</InputLabel>
            <Select
              labelId="selectBrand"
              id="selectForBrand"
              value={device.brandId}
              label={'Бренд устройства'}
              onChange={onChangeBrand}
            >
              {brands.map((brand) => {
                return (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid mt={{ xs: '1rem', md: '2rem' }}>
          <FormControl fullWidth>
            <TextField
              value={device.name}
              onChange={onChangeName}
              margin="dense"
              id="deviceName"
              label={`Название Устройства`}
              type="text"
              fullWidth
              variant="standard"
            />
          </FormControl>
        </Grid>
        <Grid mt={{ xs: '1rem', md: '2rem' }}>
          <FormControl fullWidth>
            <TextField
              value={device.price}
              onChange={onChangePrice}
              margin="dense"
              id="devicePrice"
              label={`Цена Устройства`}
              type="tel"
              fullWidth
              variant="standard"
            />
          </FormControl>
        </Grid>
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
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClickCancel}>
          Отмена
        </Button>
        <Button color="success" onClick={onClickConfirm} disabled={!isFormFullFilled()}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewDevicePopup;
