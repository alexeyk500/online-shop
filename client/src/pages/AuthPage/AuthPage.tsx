import React from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { selectIsAuth, setIsAuth } from '../../store/userSlice';
import {Button, Card, CardActions, CardContent, Container, TextField, Typography} from "@mui/material";

const AuthPage: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth={"xl"} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)', backgroundColor: ''}}>
      <Card sx={{ minWidth: 450,  boxShadow: 20}} >
        <CardContent>
          <Typography variant={'h4'} color="text.secondary" align={'center'} gutterBottom >
            Авторизация
          </Typography>
          <TextField fullWidth label="введите email" id="email" sx={{mb: 2}}/>
          <TextField fullWidth label="введите пароль" id="password" />
        </CardContent>
        <CardActions sx={{justifyContent: 'center'}}>
          <Button variant={'outlined'} sx={{mb: 1}} onClick={() => dispatch(setIsAuth(!isAuth))}>Войти</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default AuthPage;
