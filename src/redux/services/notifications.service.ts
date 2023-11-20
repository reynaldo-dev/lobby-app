import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthStateFromAsyncStorage } from '../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { environment } from '../../shared/environments/dev.environment';

export const notificationsApi = createApi({
     reducerPath: 'notificationsService',
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
     tagTypes: ['Notifications'],
     refetchOnFocus: true,
     refetchOnMountOrArgChange: true,
     refetchOnReconnect: true,
     endpoints: (builder) => ({
          sendNotification: builder.mutation<
               void,
               { userId: string; title: string; body: string }
          >({
               query: ({ userId, title, body }) => ({
                    url: `/notifications/send/${userId}`,
                    method: 'POST',
                    body: { title, body },
               }),
          }),
     }),
});

export const { useSendNotificationMutation } = notificationsApi;
