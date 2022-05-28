import { Box, Grid } from '@mui/material';
import React from 'react';
import classes from './MainPage.module.css';
import BrandTypeBar from '../AuthPage/BrandTypeBar/BrandTypeBar';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  selectorBrands,
  selectorSelectedBrand,
  selectorSelectedType,
  selectorTypes,
  setSelectedBrand,
  setSelectedType,
} from '../../store/deviceSlice';
import { BrandType, TypeType } from '../../types/types';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const types = useAppSelector(selectorTypes);
  const selectedType = useAppSelector(selectorSelectedType);
  const brands = useAppSelector(selectorBrands);
  const selectedBrand = useAppSelector(selectorSelectedBrand);

  const onSelectType = (item: TypeType) => {
    dispatch(setSelectedType(item));
  };

  const onSelectBrand = (item: BrandType) => {
    dispatch(setSelectedBrand(item));
  };

  return (
    <Grid container spacing={2} py={2}>
      <Grid item xs={3}>
        <BrandTypeBar title={'Типы Устройств'} items={types} selectedItem={selectedType} onSelectItem={onSelectType} />
        <Box sx={{ height: '2rem' }}></Box>
        <BrandTypeBar
          title={'Список Брэндов'}
          items={brands}
          selectedItem={selectedBrand}
          onSelectItem={onSelectBrand}
        />
      </Grid>
      <Grid item xs={9}>
        <div className={classes.containerItem}>xs=4</div>
      </Grid>
    </Grid>
  );
};

export default MainPage;
