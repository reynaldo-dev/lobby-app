// redeemables.service.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthStateFromAsyncStorage } from '../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { IRedeemable } from '../alliances/interfaces/reedemable.interface';

export const redeemablesApi = createApi({
  reducerPath: 'redeemablesService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://d357-138-186-250-181.ngrok-free.app/api',
    prepareHeaders: async (headers) => {
      const bearerToken = await getAuthStateFromAsyncStorage();
      if (bearerToken) {
        headers.set('authorization', bearerToken);
      }
      return headers;
    },
  }),
  tagTypes: ['Redeemables'],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getRedeemables: builder.query<IRedeemable[], void>({
      query: () => '/redeemable',
    }),
  }),
});

export const { useGetRedeemablesQuery } = redeemablesApi;
