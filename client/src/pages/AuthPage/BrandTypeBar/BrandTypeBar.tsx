import React from 'react';
import { Box, Divider, List, Typography } from '@mui/material';
import { BrandType, TypeType } from '../../../types/types';
import TypeItem from './TypeItem/TypeItem';

type PropsType = {
  title: string;
  items: TypeType[] | BrandType[];
  selectedItem: TypeType | BrandType | undefined;
  onSelectItem: (item: TypeType | BrandType) => void;
};

const BrandTypeBar: React.FC<PropsType> = ({ title, items, selectedItem, onSelectItem }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#f3f3f3',
        borderRadius: '6px',
      }}
    >
      <Typography
        variant={'h5'}
        color="text.main"
        align={'center'}
        p={1}
        sx={{ display: 'inline-block', width: '100%' }}
      >
        {title}
      </Typography>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        {items.map((item) => (
          <TypeItem item={item} isSelect={item.id === (selectedItem && selectedItem.id)} onSelectItem={onSelectItem} />
        ))}
      </List>
    </Box>
  );
};

export default BrandTypeBar;
