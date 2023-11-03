import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRegisterResponse } from '../../auth/interfaces/register-response.interface';
import { getAuthStateFromAsyncStorage } from '../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { Authentication } from '../../profile/interfaces/user.interface';
import http from '../../shared/api/api';

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
     'user/login',
     async (payload: LoginPayload) => {
          try {
               const user = await http.post<Authentication>('/auth', payload);
               const authState: Authentication = {
                    access_token: user.data.access_token,
                    user: user.data.user,
                    isAuth: true,
                    error: null,
               };
               const { error, ...rest } = authState;
               await AsyncStorage.setItem('authState', JSON.stringify(rest));
               return authState;
          } catch (error: any) {
               throw new Error(error.response.data.message);
          }
     }
);

export const register = createAsyncThunk(
     'user/register',
     async (payload: IRegisterPayload) => {
          try {
               const user = await http.post<IRegisterResponse>(
                    '/user/register',
                    payload
               );
               const authState: Authentication = {
                    access_token: user.data.access_token,
                    user: user.data.user,
                    isAuth: true,
                    error: null,
               };
               const { error, ...rest } = authState;
               await AsyncStorage.setItem('authState', JSON.stringify(rest));
               return authState;
          } catch (error: any) {
               throw new Error(error.response.data.message);
          }
     }
);

export const getUserCredentials = createAsyncThunk(
     'user/getUserCredentials',
     async () => {
          try {
               const token = await getAuthStateFromAsyncStorage();
               const user = await http.get<Authentication>('/auth/whoami', {
                    headers: {
                         Authorization: token,
                    },
               });

               const authState: Authentication = {
                    access_token: user.data.access_token,
                    user: user.data.user,
                    isAuth: true,
                    error: null,
               };
               const { error, ...rest } = authState;
               await AsyncStorage.setItem('authState', JSON.stringify(rest));
               return authState;
          } catch (error: any) {
               throw new Error(error.response.data.message);
          }
     }
);

export const logout = createAsyncThunk('user/logout', async () => {
     await AsyncStorage.removeItem('authState');
     return {
          access_token: null,
          user: null,
          isAuth: false,
          error: null,
     };
});
