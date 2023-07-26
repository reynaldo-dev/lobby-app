import { createSlice } from "@reduxjs/toolkit";
import { Authentication } from "./user.interface";
import { getUserCredentials, login } from "./user.thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: Authentication = {
  access_token: null,
  user: null,
  isAuth: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.access_token = null;
      state.user = null;
      state.isAuth = false;
      state.error = null;

      AsyncStorage.removeItem("authState");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
      state.error = action.payload.error;

      AsyncStorage.setItem("authState", JSON.stringify(state));
    });

    builder.addCase(getUserCredentials.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.isAuth = action.payload.isAuth;
      state.error = action.payload.error;
    });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
