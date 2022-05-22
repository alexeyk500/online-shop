import React from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { selectIsAuth, setIsAuth } from '../../store/userSlice';

const AuthPage: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  return (
    <div>
      AuthPage
      <br />
      isAuth = {isAuth ? 'true' : 'false'}
      <br />
      <button onClick={() => dispatch(setIsAuth(!isAuth))}>Auth</button>
    </div>
  );
};

export default AuthPage;
