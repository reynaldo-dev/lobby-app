import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import {
  IPasswordUpdatePayload,
  IPasswordUpdateResponse,
} from './interfaces/password-update';

import { getAuthStateFromAsyncStorage } from '../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import {
  UpdateProfilePayload,
  UpdateProfileResponse,
} from './interfaces/update-profile';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://f8a7-138-186-250-119.ngrok-free.app/api',
    prepareHeaders: async (headers) => {
      const bearerToken = await getAuthStateFromAsyncStorage();
      if (bearerToken) {
        headers.set('authorization', bearerToken);
      }
      return headers;
    },
  }),

  tagTypes: ['User'],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfilePayload
    >({
      query: (payload) => ({
        url: `/user/${payload.id}`,
        method: 'PATCH',
        body: {
          name: payload.name,
          lastname: payload.lastname,
          email: payload.email,
        },
      }),
    }),

    updatePassword: builder.mutation<
      IPasswordUpdateResponse,
      IPasswordUpdatePayload
    >({
      query: (payload) => ({
        url: `/user/password-update/${payload.id}`,
        method: 'PUT',
        body: {
          lastPassword: payload.currentPassword,
          newPassword: payload.newPassword,
        },
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useUpdatePasswordMutation } = userApi;
