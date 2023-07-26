import { createAsyncThunk } from "@reduxjs/toolkit";

import { Authentication } from "./user.interface";
import http from "../../../shared/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "user/login",
  async (payload: LoginPayload) => {
    try {
      const user = await http.post<Authentication>("/auth", payload);
      return {
        access_token: user.data.access_token,
        user: user.data.user,
        isAuth: true,
        error: null,
      };
    } catch (error: any) {
      return {
        access_token: null,
        user: null,
        isAuth: false,
        error: error.response.data.message,
      };
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
        error: auth.error,
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
