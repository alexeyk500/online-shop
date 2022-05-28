import React, { useState } from 'react';
import { useAppDispatch } from '../../utils/hooks';
import { userLoginThunk, userRegistrationThunk } from '../../store/userSlice';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';

const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isRegistrationForm, setIsRegistrationForm] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    if (isRegistrationForm) {
      dispatch(userRegistrationThunk({ email, password, role: 'ADMIN' }));
    } else {
      dispatch(userLoginThunk({ email, password }));
    }
  };

  const onClickAuthAndRegistration = () => {
    setIsRegistrationForm((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 64px)',
      }}
    >
      <form onSubmit={onSubmit}>
        <Card sx={{ minWidth: 450, boxShadow: 20 }}>
          <CardContent>
            <Typography variant={'h4'} color="text.secondary" align={'center'} gutterBottom>
              {isRegistrationForm ? 'Регистрация' : 'Авторизация'}
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
          <CardActions sx={{ justifyContent: 'space-between' }}>
            <div>
              <Typography
                variant={'body2'}
                color="text.secondary"
                align={'left'}
                sx={{ display: 'inline-block', mr: 1 }}
              >
                {isRegistrationForm ? 'Есть Аккаунт?' : 'Нет Аккаунта?'}
              </Typography>
              <Typography
                variant={'body2'}
                color="#1976d2"
                align={'left'}
                sx={{
                  display: 'inline-block',
                  '&:hover': {
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  },
                }}
                onClick={onClickAuthAndRegistration}
              >
                {isRegistrationForm ? 'Авторизуйся!' : 'Зарегестрируйся!'}
              </Typography>
            </div>
            <Button variant={'outlined'} sx={{ mb: 1, mr: 1 }} type={'submit'}>
              {isRegistrationForm ? 'Регистрация' : 'Войти'}
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default AuthPage;
