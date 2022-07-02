import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppSelector } from '../../../../utils/hooks';
import { selectorBrands } from '../../../../store/deviceSlice';
import { DeviceType } from '../../../../types/types';

type PropsType = {
  device: DeviceType;
  setDevice: (device: DeviceType) => void;
};

const SelectBrandSection: React.FC<PropsType> = ({ device, setDevice }) => {
  const brands = useAppSelector(selectorBrands);

  const onChangeBrand = (e: SelectChangeEvent) => {
    const newDevice = { ...device };
    newDevice.brandId = e.target.value;
    setDevice(newDevice);
  };

  return (
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
  );
};

export default SelectBrandSection;
