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
    price: '0',
    img: '',
    rating: '0',
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
  }, []);

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

  // function onChange(event) {
  //   var file = event.target.files[0];
  //   var reader = new FileReader();
  //   reader.onload = function(event) {
  //     // The file's text will be printed here
  //     console.log(event.target.result)
  //   };
  //
  //   reader.readAsText(file);
  // }

  return (
    <Dialog maxWidth={'md'} open={isShow} onClose={onClickCancel}>
      <DialogTitle width={'70vw'}>{`Панель добавления нового устройства`}</DialogTitle>
      <DialogContent>
        <FormControl sx={{ marginTop: '1rem' }} fullWidth>
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
        <FormControl sx={{ marginTop: '2rem' }} fullWidth>
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
        <FormControl sx={{ marginTop: '2rem' }} fullWidth>
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
        <FormControl sx={{ marginTop: '2rem' }} fullWidth>
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
        <FormControl sx={{ marginTop: '4rem' }} fullWidth>
          <Grid display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'start'}>
            {device.file ? (
              <>
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    marginRight: '2rem',
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                    borderRadius: '12px',
                    boxShadow: '5',
                    objectFit: 'contain',
                  }}
                  alt="The house from the offer."
                  src={fileDataURL}
                />
                <Typography mr={'2rem'} gutterBottom variant="button" component="div" color="green">
                  {device.file.name}
                </Typography>
              </>
            ) : (
              <Typography mr={'2rem'} gutterBottom variant="button" component="div" color="red">
                Файл не загружен
              </Typography>
            )}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={onChangeFile}
            />
            <label htmlFor="raised-button-file">
              <Button variant={'outlined'} component="span">
                {device.file ? 'Заменить файл' : 'Загрузить Файл'}
              </Button>
            </label>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClickCancel}>
          Отмена
        </Button>
        <Button
          color="success"
          onClick={onClickConfirm}
          disabled={!device.name && !device.img && !device.price && !device.typeId && !device.brandId}
        >
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewDevicePopup;
