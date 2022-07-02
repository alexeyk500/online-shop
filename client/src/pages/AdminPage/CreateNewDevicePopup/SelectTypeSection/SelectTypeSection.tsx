import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppSelector } from '../../../../utils/hooks';
import { selectorTypes } from '../../../../store/deviceSlice';
import { DeviceType } from '../../../../types/types';

type PropsType = {
  device: DeviceType;
  setDevice: (device: DeviceType) => void;
};

const SelectTypeSection: React.FC<PropsType> = ({ device, setDevice }) => {
  const types = useAppSelector(selectorTypes);

  const onChangeType = (e: SelectChangeEvent) => {
    const newDevice = { ...device };
    newDevice.typeId = e.target.value;
    setDevice(newDevice);
  };

  return (
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
  );
};

export default SelectTypeSection;
