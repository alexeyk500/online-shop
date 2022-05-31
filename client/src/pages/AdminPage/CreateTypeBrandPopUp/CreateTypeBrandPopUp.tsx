import React, { useEffect, useState } from 'react';
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
import { selectorBrands, selectorTypes } from '../../../store/deviceSlice';

import DeleteIcon from '@mui/icons-material/Delete';
import { TypePopupEnum } from '../AdminPage';
import { BrandType, TypeType } from '../../../types/types';

type PropsType = {
  typePopup: TypePopupEnum | undefined;
  onClosePopup: (value: string | undefined) => void;
};

const CreateTypeBrandPopUp: React.FC<PropsType> = ({ typePopup, onClosePopup }) => {
  const types = useAppSelector(selectorTypes);
  const brands = useAppSelector(selectorBrands);

  const [value, setValue] = useState('');

  const [items, setItems] = useState<TypeType[] | BrandType[] | undefined>(undefined);

  useEffect(() => {
    if (typePopup === TypePopupEnum.typePopup) {
      setItems(types);
    } else {
      setItems(brands);
    }
  }, [typePopup, types, brands]);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickConfirm = () => {
    setValue('');
    typePopup && onClosePopup(value);
  };

  const onClickCancel = () => {
    onClosePopup(undefined);
  };

  return (
    <Dialog open={!!typePopup} onClose={onClickCancel}>
      <DialogTitle>
        {`Панель управления ${typePopup === TypePopupEnum.typePopup ? 'Типами' : 'Брендами'} устройств`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: '1rem' }}>{`Существующие ${
          typePopup === TypePopupEnum.typePopup ? 'Типы' : 'Бренды'
        } устройств - ${items ? items.length : '0'} шт.`}</DialogContentText>
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
          {items &&
            items.map((item) => {
              return (
                <ListItem
                  sx={{ padding: '1px' }}
                  key={item.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              );
            })}
        </List>
        <DialogContentText variant={'h5'} mt={'2rem'}>
          {`Введите название нового ${typePopup === TypePopupEnum.typePopup ? 'Типа' : 'Бренда'} устройства`}
        </DialogContentText>
        <TextField
          value={value}
          onChange={onChangeValue}
          autoFocus
          margin="dense"
          id="typeInput"
          label={`Название нового ${typePopup === TypePopupEnum.typePopup ? 'Типа' : 'Бренда'} для Устройства`}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClickCancel}>
          Отмена
        </Button>
        <Button color="success" onClick={onClickConfirm} disabled={!value}>
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTypeBrandPopUp;
