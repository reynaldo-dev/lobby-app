import { createSlice } from '@reduxjs/toolkit';
import { Authentication } from './user.interface';
import { getUserCredentials, login, logout } from './user.thunk';

const initialState: Authentication = {
  access_token: null,
  user: null,
  isAuth: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDefaultState: (state) => {
      state.access_token = null;
      state.user = null;
      state.isAuth = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = action.payload.error;
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.access_token = null;
      state.user = null;
      state.isAuth = false;
    });

    builder.addCase(getUserCredentials.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
      state.error = action.payload.error;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
      state.error = action.payload.error;
    });
  },
});
export const { setDefaultState } = userSlice.actions;
export default userSlice.reducer;
