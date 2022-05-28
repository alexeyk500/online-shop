import React from 'react';
import AppRouter from './components/AppRouter/AppRouter';
import NavBar from './components/NavBar/NavBar';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth={'xl'}>
        <AppRouter />
      </Container>
    </>
  );
}

export default App;
