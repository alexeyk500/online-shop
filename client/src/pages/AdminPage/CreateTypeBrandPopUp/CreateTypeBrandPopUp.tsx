import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useAppSelector } from '../../../utils/hooks';
import { selectorBrands, selectorTypes } from '../../../store/deviceSlice';

import { TypePopupEnum } from '../AdminPage';
import { BrandType, TypeType } from '../../../types/types';
import ListCreateTypeBrand from './ListCreateTypeBrand/ListCreateTypeBrand';

type PropsType = {
  typePopup: TypePopupEnum | undefined;
  onClosePopup: () => void;
  onAddNewItem: (value: string) => void;
  onDeleteItem: (id: string) => void;
};

const CreateTypeBrandPopUp: React.FC<PropsType> = ({ typePopup, onClosePopup, onAddNewItem, onDeleteItem }) => {
  const types = useAppSelector(selectorTypes);
  const brands = useAppSelector(selectorBrands);

  const [value, setValue] = useState('');
  const [items, setItems] = useState<TypeType[] | BrandType[] | undefined>(undefined);

  const itemToScrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(false);

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

  useEffect(() => {
    scrollToBottom && itemToScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    // eslint-disable-next-line
  }, [items]);

  const onClickConfirm = () => {
    setValue('');
    onAddNewItem(value);
    setScrollToBottom(true);
  };

  const onClickCancel = () => {
    onClosePopup();
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
        <ListCreateTypeBrand items={items} itemToScrollRef={itemToScrollRef} onDeleteItem={onDeleteItem} />
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
