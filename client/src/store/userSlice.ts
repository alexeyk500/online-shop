import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { serverApi } from '../api/serverApi';
import { TOKEN_NAME } from '../index';
import { PostLoginServerType, PostRegistrationServerType } from '../api/serverTypes';
import { AxiosError } from 'axios';

export interface UserState {
  isLoading: boolean;
  isAuth: boolean;
  user: {};
}

const initialState: UserState = {
  isLoading: false,
  isAuth: false,
  user: {},
};

export const userLoginThunk = createAsyncThunk<
  PostLoginServerType,
  { email: string; password: string },
  { rejectValue: string }
>('user/LoginThunk', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await serverApi.userLogin({ email, password });
  } catch (e) {
    return rejectWithValue('Login User Error\n' + JSON.stringify((e as AxiosError).response?.data));
  }
});

export const userRegistrationThunk = createAsyncThunk<
  PostRegistrationServerType,
  { email: string; password: string; role?: string },
  { rejectValue: string }
>('user/RegistrationThunk', async ({ email, password, role }, { rejectWithValue }) => {
  try {
    return await serverApi.userRegistration({ email, password, role });
  } catch (e) {
    return rejectWithValue('Registration User Error\n' + JSON.stringify((e as AxiosError).response?.data));
  }
});

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,

  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem(TOKEN_NAME);
      state.isAuth = false;
      state.user = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(userLoginThunk.pending, userRegistrationThunk.pending), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(userLoginThunk.fulfilled, userRegistrationThunk.fulfilled), (state, action) => {
        const token = action.payload.token;
        localStorage.setItem(TOKEN_NAME, token);
        state.isAuth = true;
        state.isLoading = false;
      })
      .addMatcher(isAnyOf(userLoginThunk.rejected, userRegistrationThunk.rejected), (state) => {
        logoutUser();
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export const selectIsAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;
