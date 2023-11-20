import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthStateFromAsyncStorage } from '../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { environment } from '../../shared/environments/dev.environment';
import { fcmTokens } from '../../shared/interfaces/shared.interface';

export const fcmTokensApi = createApi({
     reducerPath: 'fcmTokensService',
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
     tagTypes: ['FcmTokens'],
     refetchOnFocus: true,
     refetchOnMountOrArgChange: true,
     refetchOnReconnect: true,
     endpoints: (builder) => ({
          createFcmToken: builder.mutation<void, fcmTokens>({
               query: (createFcmTokenDto) => ({
                    url: '/fcm-tokens',
                    method: 'POST',
                    body: createFcmTokenDto,
               }),
          }),
          findAllFcmTokens: builder.query<any[], void>({
               query: () => '/fcm-tokens',
          }),
          findFcmToken: builder.query<any, string>({
               query: (userId) => `/fcm-tokens/${userId}`,
          }),
          updateFcmToken: builder.mutation<void, { id: string; token: string }>(
               {
                    query: ({ id, token }) => ({
                         url: `/fcm-tokens/${id}`,
                         method: 'PATCH',
                         body: token,
                    }),
               }
          ),
          removeFcmToken: builder.mutation<void, string>({
               query: (id) => ({
                    url: `/fcm-tokens/${id}`,
                    method: 'DELETE',
               }),
          }),
     }),
});

export const {
     useCreateFcmTokenMutation,
     useFindAllFcmTokensQuery,
     useFindFcmTokenQuery,
     useUpdateFcmTokenMutation,
     useRemoveFcmTokenMutation,
} = fcmTokensApi;
