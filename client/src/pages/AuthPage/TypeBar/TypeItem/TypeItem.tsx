import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import { TypeType } from '../../../../types/types';

type PropsType = {
  item: TypeType;
  isSelect: boolean;
  onClickItem: (item: TypeType) => void;
};

const TypeItem: React.FC<PropsType> = ({ item, isSelect, onClickItem }) => {
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
        onClickItem(item);
      }}
    >
      <ListItemText primary={item.name} />
    </ListItemButton>
  );
};

export default TypeItem;
