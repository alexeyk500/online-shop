import React from 'react';
import AppRouter from './components/AppRouter/AppRouter';
import NavBar from './components/NavBar/NavBar';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <NavBar />
      <Container
        maxWidth={'xl'}
        sx={{ maxHeight: { xs: 'auto', md: 'calc(100vh - 64px)' }, overflow: { xs: 'auto', md: 'hidden' } }}
      >
        <AppRouter />
      </Container>
    </>
  );
}

export default App;
