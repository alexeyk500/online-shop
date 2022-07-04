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
  editItemId: string | undefined;
  onClickEditItem: (id: string | undefined) => void;
};

const ItemListCreateTypeBrand: React.FC<PropsType> = ({
  item,
  ind,
  length,
  itemToScrollRef,
  onDeleteItem,
  editItemId,
  onClickEditItem,
}) => {
  const onClickDelete = () => {
    onDeleteItem(item.id);
  };

  const onClickEdit = () => {
    onClickEditItem(item.id);
  };

  return (
    <ListItem
      sx={{
        padding: '1px 10px',
        backgroundColor: editItemId === item.id ? 'info.light' : 'inherit',
        borderRadius: '6px',
      }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onClickDelete}>
          <DeleteIcon />
        </IconButton>
      }
      onClick={onClickEdit}
    >
      <ListItemText primary={item.name} />
      {ind + 1 === length && <div key={ind + 1} ref={itemToScrollRef}></div>}
    </ListItem>
  );
};

export default ItemListCreateTypeBrand;
