import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { logoutUser, selectIsAuth } from '../../store/userSlice';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [isAuth]);

  const onClickLogin = () => {
    navigate('/auth');
  };

  const onClickLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const onClickAdmin = () => {
    navigate('/admin');
  };

  const onClickGoMain = () => {
    navigate('/');
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
                A500 Магазин
              </Link>
            </Typography>
            {isAuth ? (
              location.pathname === '/admin' ? (
                <Button color="inherit" variant="outlined" sx={{ mr: 2 }} onClick={onClickGoMain}>
                  На главную
                </Button>
              ) : (
                <>
                  <Button color="inherit" variant="outlined" sx={{ mr: 2 }} onClick={onClickAdmin}>
                    Админ Панель
                  </Button>
                  <Button color="inherit" variant="outlined" onClick={onClickLogout}>
                    Выйти
                  </Button>
                </>
              )
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
