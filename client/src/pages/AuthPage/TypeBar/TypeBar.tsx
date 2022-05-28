import React from 'react';
import { Box, Divider, List, Typography } from '@mui/material';
import { useAppSelector } from '../../../utils/hooks';
import { selectorTypes } from '../../../store/deviceSlice';
import { TypeType } from '../../../types/types';
import TypeItem from './TypeItem/TypeItem';

const TypeBar: React.FC = () => {
  const types = useAppSelector(selectorTypes);

  const [selectedItem, setSelectedItem] = React.useState(types[0] ?? undefined);

  const onClickItem = (item: TypeType) => {
    setSelectedItem(item);
  };

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
        Типы устройств
      </Typography>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        {types.map((item) => (
          <TypeItem item={item} isSelect={item.id === selectedItem.id} onClickItem={onClickItem} />
        ))}
      </List>
    </Box>
  );
};

export default TypeBar;
