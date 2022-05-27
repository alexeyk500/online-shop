import React from 'react';
import { useAppDispatch } from '../../utils/hooks';
import { userLoginThunk } from '../../store/userSlice';
import { Button, Card, CardActions, CardContent, Container, TextField, Typography } from '@mui/material';

const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    dispatch(userLoginThunk({ email, password }));
  };

  return (
    <Container
      maxWidth={'xl'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
        backgroundColor: '#fafafa',
      }}
    >
      <form onSubmit={onSubmit}>
        <Card sx={{ minWidth: 450, boxShadow: 20 }}>
          <CardContent>
            <Typography variant={'h4'} color="text.secondary" align={'center'} gutterBottom>
              Авторизация
            </Typography>
            <TextField fullWidth label="введите E-mail" id="email" sx={{ mb: 2 }} />
            <TextField
              fullWidth
              label="введите пароль"
              id="password"
              type={'password'}
              InputProps={{
                autoComplete: 'on',
              }}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button variant={'outlined'} sx={{ mb: 1 }} type={'submit'}>
              Войти
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
};

export default AuthPage;
