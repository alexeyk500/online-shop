import React from 'react';
import classes from './App.module.css';


function App() {
  return (
    <div className={classes.container}>
      <div className="someClass"></div>
      <div className={'otherClass'}></div>
      Hello Client
    </div>
  );
}

export default App;
