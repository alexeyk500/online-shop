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
  const [editItemId, setEditItemId] = useState<string | undefined>(undefined);

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
    if (editItemId) {
      console.log('will edit item')
    } else {
      onAddNewItem(value);
      setScrollToBottom(true);
    }

  };

  const onClickCancel = () => {
    setValue('');
    setEditItemId(undefined);
    onClosePopup();
  };

  const onClickEditItem = (id: string | undefined) => {
    if (editItemId !== id) {
      const arrayForFind = typePopup === TypePopupEnum.typePopup ? types : brands;
      const oldValue = arrayForFind.find((item) => item.id === id);
      if (oldValue) {
        setEditItemId(id);
        setValue(oldValue.name);
      }
    } else {
      setEditItemId(undefined);
      setValue('');
    }
  };

  const isDisabled = (): boolean => {
    if (editItemId) {
      const arrayForFind = typePopup === TypePopupEnum.typePopup ? types : brands;
      const oldValue = arrayForFind.find((item) => item.id === editItemId);
      if (oldValue && oldValue.name === value) {
        return true
      }
    } else {
      if (!value) {
        return true
      }
    }
    return false
  }

  return (
    <Dialog open={!!typePopup} onClose={onClickCancel}>
      <DialogTitle>
        {`???????????? ???????????????????? ${typePopup === TypePopupEnum.typePopup ? '????????????' : '????????????????'} ??????????????????`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: '1rem' }}>{`???????????????????????? ${
          typePopup === TypePopupEnum.typePopup ? '????????' : '????????????'
        } ?????????????????? - ${items ? items.length : '0'} ????.`}</DialogContentText>
        <ListCreateTypeBrand
          items={items}
          itemToScrollRef={itemToScrollRef}
          onDeleteItem={onDeleteItem}
          editItemId={editItemId}
          onClickEditItem={onClickEditItem}
        />
        <DialogContentText variant={'h5'} mt={'2rem'} width={'80vw'}>
          {editItemId ? '?????????????????????????????? ???????????????? ' : '?????????????? ???????????????? ???????????? '}
          {`${typePopup === TypePopupEnum.typePopup ? '????????' : '????????????'} ????????????????????`}
        </DialogContentText>
        <TextField
          value={value}
          onChange={onChangeValue}
          autoFocus
          margin="dense"
          id="typeInput"
          label={`???????????????? ${typePopup === TypePopupEnum.typePopup ? '????????' : '????????????'} ?????? ????????????????????`}
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClickCancel}>
          ????????????
        </Button>
        <Button color="success" onClick={onClickConfirm} disabled={isDisabled()}>
          {
            editItemId ? '??????????????????' : '??????????????'
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTypeBrandPopUp;
