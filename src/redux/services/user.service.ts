import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getAuthStateFromAsyncStorage } from '../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { ICurrentLeague } from '../../home/interfaces/current-league.interface';
import {
     IPasswordUpdatePayload,
     IPasswordUpdateResponse,
} from '../../profile/interfaces/password-update';
import {
     UpdateProfilePayload,
     UpdateProfileResponse,
} from '../../profile/interfaces/update-profile';
import { User } from '../../profile/interfaces/user.interface';
import { GetUserByFullNameArgs } from '../../recognitions/interfaces/user-search';
import { environment } from '../../shared/environments/dev.environment';

export const userApi = createApi({
     reducerPath: 'userApi',
     baseQuery: fetchBaseQuery({
          baseUrl: environment.api_url,
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
          getUserByFullName: builder.query<User[], GetUserByFullNameArgs>({
               query: ({ query, from = 0, limit = 10 }) =>
                    `/user/search?query=${query}&from=${from}&limit=${limit}`,
          }),
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
                         phone: payload.phone,
                         department: payload.department,
                         city: payload.city,
                         workplace: payload.workplace,
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

          getCurrentCredits: builder.query<{ credits: number }, string>({
               query: (userId) => `/user/current-credits/${userId}`,
          }),

          getCurrentRecognitionsCount: builder.query<
               { recognitionsReceivedCount: number },
               string
          >({
               query: (userId) => `/user/current-recognitions-count/${userId}`,
          }),

          getCurrentLeague: builder.query<ICurrentLeague, string>({
               query: (userId) => `/user/current-league/${userId}`,
          }),
     }),
});

export const {
     useUpdateProfileMutation,
     useUpdatePasswordMutation,
     useLazyGetUserByFullNameQuery,
     useGetCurrentCreditsQuery,
     useGetCurrentRecognitionsCountQuery,
     useGetCurrentLeagueQuery,
} = userApi;
