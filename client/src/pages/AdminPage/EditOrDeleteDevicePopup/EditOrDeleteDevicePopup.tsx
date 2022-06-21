import React, { useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
  getDevicesThunk,
  selectorBrands,
  selectorSelectedBrand,
  selectorSelectedType,
  selectorTypes,
  setSelectedBrand,
  setSelectedType,
} from '../../../store/deviceSlice';
import BrandTypeBar from '../../MainPage/BrandTypeBar/BrandTypeBar';
import { BrandType, TypeType } from '../../../types/types';
import EditOrDeleteDevicesList from './EditOrDeleteDevicesList/EditOrDeleteDevicesList';

type PropsType = {
  isOpen: boolean;
  onClosePopup: (deviceId: string | undefined, params?: { typeId?: string; brandId?: string }) => void;
  isEditPopUp?: boolean;
};

const EditOrDeleteDevicePopup: React.FC<PropsType> = ({ isOpen, isEditPopUp, onClosePopup }) => {
  const dispatch = useAppDispatch();
  const types = useAppSelector(selectorTypes);
  const selectedType = useAppSelector(selectorSelectedType);
  const brands = useAppSelector(selectorBrands);
  const selectedBrand = useAppSelector(selectorSelectedBrand);

  useEffect(() => {
    dispatch(getDevicesThunk({}));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getDevicesThunk({ typeId: selectedType?.id, brandId: selectedBrand?.id }));
  }, [selectedType, selectedBrand, dispatch]);

  const onSelectType = (item: TypeType) => {
    dispatch(setSelectedType(item));
  };

  const onSelectBrand = (item: BrandType) => {
    dispatch(setSelectedBrand(item));
  };

  const onClickCancel = () => {
    onClosePopup(undefined);
  };

  const onClickEditOrDeleteDevice = (deviceId: string) => {
    if (isEditPopUp) {
      onClosePopup(deviceId)
    } else {
      const isDelete = window.confirm('Удалить устройсво?');
      if (isDelete) {
        onClosePopup(deviceId, { typeId: selectedType?.id, brandId: selectedBrand?.id });
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClickCancel} PaperProps={{ sx: { width: '80%', maxHeight: '80%' } }}>
      <DialogTitle>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {isEditPopUp ? 'Панель редактирования устройств' : 'Панель удаления устройств'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} py={2}>
          <Grid
            item
            xs={12}
            md={6}
            mt={'1rem'}
            sx={{ display: { xs: 'flex', md: 'block' }, flexDirection: 'column', alignItems: { xs: 'center' } }}
          >
            <BrandTypeBar
              title={'Типы Устройств'}
              items={types}
              selectedItem={selectedType}
              onSelectItem={onSelectType}
            />
            <Box sx={{ height: '2rem' }} />
            <BrandTypeBar
              title={'Список Брендов'}
              items={brands}
              selectedItem={selectedBrand}
              onSelectItem={onSelectBrand}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ paddingRight: { xs: 0, md: '16px' }, maxHeight: '60vh', overflowY: { md: 'scroll' } }}
          >
            <EditOrDeleteDevicesList onClickEditOrDeleteDevice={onClickEditOrDeleteDevice} isEditPopUp={isEditPopUp} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClickCancel}>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrDeleteDevicePopup;
