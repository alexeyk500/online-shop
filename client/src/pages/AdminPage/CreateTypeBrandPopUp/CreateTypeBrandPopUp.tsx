import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { useAppSelector } from '../../../utils/hooks';
import { selectorTypes } from '../../../store/deviceSlice';

import DeleteIcon from '@mui/icons-material/Delete';

type PropsType = {
  isOpenTypePopup: boolean;
  onClosePopup: () => void;
};

const CreateTypeBrandPopUp: React.FC<PropsType> = ({ isOpenTypePopup, onClosePopup }) => {
  const types = useAppSelector(selectorTypes);

  const [value, setValue] = useState('');

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickConfirm = () => {
    console.log('Confirm - ', value);
    setValue('');
    isOpenTypePopup && onClosePopup();
  };

  return (
    <Dialog open={isOpen} onClose={onClosePopup}>
      <DialogTitle>Типы Устройств</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ marginBottom: '1rem' }}
        >{`Существующие типы устройств - ${types.length} шт.`}</DialogContentText>
        <List
          sx={{
            maxHeight: '15vh',
            overflow: 'auto',
            border: '1px solid ',
            borderColor: 'text.secondary',
            borderRadius: '6px',
            paddingLeft: '1rem',
          }}
        >
          {types.map((type) => {
            return (
              <ListItem
                sx={{ padding: '1px' }}
                key={type.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={type.name} />
              </ListItem>
            );
          })}
        </List>
        <DialogContentText variant={'h5'} mt={'2rem'}>
          Введите название нового типа устройства
        </DialogContentText>
        <TextField
          value={value}
          onChange={onChangeValue}
          autoFocus
          margin="dense"
          id="typeInput"
          label="Название нового Типа для Устройства"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Отмена
        </Button>
        <Button color="success" onClick={onClickConfirm}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTypeBrandPopUp;
