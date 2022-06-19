import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import AuthPage from '../../pages/AuthPage/AuthPage';
import DevicePage from '../../pages/DevicePage/DevicePage';
import AdminPage from '../../pages/AdminPage/AdminPage';
import BasketPage from '../../pages/BasketPage/BasketPage';
import { selectIsAuth } from '../../store/userSlice';
import { useAppSelector } from '../../utils/hooks';

export const publicRoutes = [
  { path: '/', element: <MainPage /> },
  { path: '/auth', element: <AuthPage /> },
  { path: '/device/:id', element: <DevicePage /> },
];

export const privateRoutes = [
  { path: '/admin', element: <AdminPage /> },
  { path: '/basket', element: <BasketPage /> },
];

const AppRouter: React.FC = () => {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <Routes>
      {publicRoutes.map((curRoute, ind) => {
        return <Route key={ind} path={curRoute.path} element={curRoute.element} />;
      })}
      {isAuth &&
        privateRoutes.map((curRoute, ind) => {
          return <Route key={ind} path={curRoute.path} element={curRoute.element} />;
        })}
      <Route path={'*'} element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
