import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import { BrandType, TypeType } from '../../../../types/types';

type PropsType = {
  item: TypeType | BrandType;
  isSelect: boolean;
  onSelectItem: (item: TypeType) => void;
};

const TypeItem: React.FC<PropsType> = ({ item, isSelect, onSelectItem }) => {
  return (
    <ListItemButton
      selected={isSelect}
      sx={{
        '&.Mui-selected': {
          backgroundColor: '#dadada',
        },
        ':hover': {
          backgroundColor: '#bbbbbb',
        },
        '&.Mui-selected:hover': {
          backgroundColor: '#ababab',
        },

        borderRadius: '6px',
      }}
      onClick={() => {
        onSelectItem(item);
      }}
    >
      <ListItemText primary={item.name} />
    </ListItemButton>
  );
};

export default TypeItem;
