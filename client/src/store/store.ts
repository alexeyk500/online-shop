import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import devicesReducer from './deviceSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    devices: devicesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
