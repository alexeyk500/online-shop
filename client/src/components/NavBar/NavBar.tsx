import React from 'react';
import {AppBar, Toolbar, Typography, Button, Container} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import { selectIsAuth } from '../../store/userSlice';

const NavBar: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
              A500 Shop
            </Link>
          </Typography>
          {isAuth ? (
            <Button color="inherit" variant="outlined">
              Войти
            </Button>
          ) : (
            <>
              <Button color="inherit" variant="outlined" sx={{ mr: 2 }}>
                Админ Панель
              </Button>
              <Button color="inherit" variant="outlined">
                Выйти
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
