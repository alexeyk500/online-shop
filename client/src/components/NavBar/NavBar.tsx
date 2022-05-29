import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { logoutUser, selectIsAuth } from '../../store/userSlice';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    isAuth && navigate('/');
  }, [isAuth, navigate]);

  const onClickLogin = () => {
    navigate('/auth');
  };

  const onClickLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <>
      <AppBar position='fixed'>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
                A500 Shop
              </Link>
            </Typography>
            {isAuth ? (
              <>
                <Button color="inherit" variant="outlined" sx={{ mr: 2 }}>
                  Админ Панель
                </Button>
                <Button color="inherit" variant="outlined" onClick={onClickLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <Button color="inherit" variant="outlined" onClick={onClickLogin}>
                Войти
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
