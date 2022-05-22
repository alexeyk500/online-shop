import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export interface UserState {
  isAuth: boolean;
  user: {};
}

const initialState: UserState = {
  isAuth: false,
  user: {},
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,

  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = userSlice.actions;

export const selectIsAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;
