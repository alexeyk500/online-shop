import { Grid } from '@mui/material';
import React from 'react';
import classes from './MainPage.module.css';
import TypeBar from '../AuthPage/TypeBar/TypeBar';

const MainPage: React.FC = () => {
  return (
    <Grid container spacing={2} py={2}>
      <Grid item xs={3}>
        <TypeBar />
      </Grid>
      <Grid item xs={9}>
        <div className={classes.containerItem}>xs=4</div>
      </Grid>
    </Grid>
  );
};

export default MainPage;
