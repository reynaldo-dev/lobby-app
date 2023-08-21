import { createAsyncThunk } from "@reduxjs/toolkit";

import { Authentication } from "./user.interface";
import http from "../../../shared/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IRegisterResponse } from "../interfaces/register-response.interface";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  name: string;
  lastname: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (payload: LoginPayload) => {
    try {
      const user = await http.post<Authentication>("/auth", payload);

      const authState: Authentication = {
        access_token: user.data.access_token,
        user: user.data.user,
        isAuth: true,
        error: null,
      };
      const { error, ...rest } = authState;
      await AsyncStorage.setItem("authState", JSON.stringify(rest));
      return authState;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (payload: IRegisterPayload) => {
    try {
      const user = await http.post<IRegisterResponse>(
        "/user/register",
        payload
      );
      console.log("thunk", user.data);

      const authState: Authentication = {
        access_token: user.data.access_token,
        user: user.data.user,
        isAuth: true,
        error: null,
      };
      const { error, ...rest } = authState;
      await AsyncStorage.setItem("authState", JSON.stringify(rest));
      return authState;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }
);

export const getUserCredentials = createAsyncThunk(
  "user/getUserCredentials",
  async () => {
    const authState = await AsyncStorage.getItem("authState");
    if (authState) {
      const auth = JSON.parse(authState) as Authentication;
      return {
        access_token: auth.access_token,
        user: auth.user,
        isAuth: auth.isAuth,
        error: null,
      };
    } else {
      return {
        access_token: null,
        user: null,
        isAuth: false,
        error: null,
      };
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  await AsyncStorage.removeItem("authState");
  return {
    access_token: null,
    user: null,
    isAuth: false,
    error: null,
  };
});
