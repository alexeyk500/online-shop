import React from 'react';
import { List } from '@mui/material';
import { BrandType, TypeType } from '../../../../types/types';
import ItemListCreateTypeBrand from './ItemListCreateTypeBrand/ItemListCreateTypeBrand';

type PropsType = {
  items: TypeType[] | BrandType[] | undefined;
  itemToScrollRef: React.LegacyRef<HTMLDivElement> | null;
  onDeleteItem: (id: string) => void;
  editItemId: string | undefined;
  onClickEditItem: (id: string | undefined) => void;
};

const ListCreateTypeBrand: React.FC<PropsType> = ({
  items,
  itemToScrollRef,
  onDeleteItem,
  onClickEditItem,
  editItemId,
}) => {
  return (
    <List
      sx={{
        padding: '10px',
        maxHeight: '15vh',
        overflow: 'auto',
        border: '1px solid ',
        borderColor: 'text.secondary',
        borderRadius: '6px',
        paddingLeft: '1rem',
      }}
    >
      {items && !!items.length ? (
        items.map((item, ind) => (
          <ItemListCreateTypeBrand
            key={item.id}
            item={item}
            ind={ind}
            length={items.length}
            itemToScrollRef={itemToScrollRef}
            onDeleteItem={onDeleteItem}
            editItemId={editItemId}
            onClickEditItem={onClickEditItem}
          />
        ))
      ) : (
        <>List is empty</>
      )}
    </List>
  );
};

export default ListCreateTypeBrand;
