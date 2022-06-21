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
import { TOKEN_NAME } from '../../index';
import { loginUserByToken } from '../../store/userSlice';

const CARDS_ON_PAGE_LIMIT = '5';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const types = useAppSelector(selectorTypes);
  const selectedType = useAppSelector(selectorSelectedType);
  const brands = useAppSelector(selectorBrands);
  const selectedBrand = useAppSelector(selectorSelectedBrand);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_NAME);
    if (token) {
      dispatch(loginUserByToken(token));
    }
    dispatch(getDevicesTapesThunk());
    dispatch(getDevicesBrandsThunk());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(
      getDevicesThunk({ typeId: selectedType?.id, brandId: selectedBrand?.id, limit: CARDS_ON_PAGE_LIMIT, page: '1' })
    );
  }, [selectedType, selectedBrand, dispatch]);

  const onSelectType = (item: TypeType) => {
    dispatch(setSelectedType(item));
  };

  const onSelectBrand = (item: BrandType) => {
    dispatch(setSelectedBrand(item));
  };

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
