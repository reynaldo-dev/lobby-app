import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getAuthStateFromAsyncStorage } from '../../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { UpdateProfilePayload, UpdateProfileResponse } from './update-profile';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://a62f-138-186-250-188.ngrok-free.app/api',
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
  }),
});

export const { useUpdateProfileMutation } = userApi;
