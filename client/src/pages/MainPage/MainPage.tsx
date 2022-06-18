import { Box, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import BrandTypeBar from './BrandTypeBar/BrandTypeBar';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  getDevicesBrandsThunk,
  getDevicesTapesThunk,
  getDevicesThunk,
  selectorBrands,
  selectorSelectedBrand,
  selectorSelectedType,
  selectorTypes,
  setSelectedBrand,
  setSelectedType,
} from '../../store/deviceSlice';
import { BrandType, TypeType } from '../../types/types';
import DeviceList from './DeviceList/DeviceList';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const types = useAppSelector(selectorTypes);
  const selectedType = useAppSelector(selectorSelectedType);
  const brands = useAppSelector(selectorBrands);
  const selectedBrand = useAppSelector(selectorSelectedBrand);

  useEffect(() => {
    dispatch(getDevicesTapesThunk());
    dispatch(getDevicesBrandsThunk());
    const params = { typeId: '1', brandId: '1', limit: '5', page: '1' };
    dispatch(getDevicesThunk(params));
    // eslint-disable-next-line
  }, []);

  const onSelectType = (item: TypeType) => {
    dispatch(setSelectedType(item));
  };

  const onSelectBrand = (item: BrandType) => {
    dispatch(setSelectedBrand(item));
  };

  console.log('REACT_APP_API_URL =', process.env.REACT_APP_API_URL);

  return (
    <Grid container spacing={2} py={2}>
      <Grid
        item
        xs={12}
        md={3}
        mt={'1rem'}
        sx={{ display: { xs: 'flex', md: 'block' }, flexDirection: 'column', alignItems: { xs: 'center' } }}
      >
        <BrandTypeBar title={'Типы Устройств'} items={types} selectedItem={selectedType} onSelectItem={onSelectType} />
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
        md={9}
        sx={{ paddingRight: { xs: 0, md: '16px' }, maxHeight: 'calc(100vh - 64px)', overflowY: { md: 'scroll' } }}
      >
        <DeviceList />
      </Grid>
    </Grid>
  );
};

export default MainPage;
