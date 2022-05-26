import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import counterReducer from '../features/counter/counterSlice';
import devicesReducer from './deviceSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
    devices: devicesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
