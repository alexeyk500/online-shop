import React from 'react';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BrandType, TypeType } from '../../../../../types/types';

type PropsType = {
  item: TypeType | BrandType;
  ind: number;
  length: number;
  itemToScrollRef: React.LegacyRef<HTMLDivElement>;
  onDeleteItem: (id: string) => void;
};

const ItemListCreateTypeBrand: React.FC<PropsType> = ({ item, ind, length, itemToScrollRef, onDeleteItem }) => {
  const onClickDelete = () => {
    onDeleteItem(item.id);
  };

  return (
    <ListItem
      sx={{ padding: '1px' }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onClickDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item.name} />
      {ind + 1 === length && <div ref={itemToScrollRef}></div>}
    </ListItem>
  );
};

export default ItemListCreateTypeBrand;
