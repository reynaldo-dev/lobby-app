// redeemables.service.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthStateFromAsyncStorage } from '../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { IRedeemable } from '../../alliances/interfaces/reedemable.interface';
import {
     IConfirmOrderRequest,
     IConfirmOrderResponse,
} from '../../redeemables/interfaces/confirm-order.interface';
import { environment } from '../../shared/environments/dev.environment';

export const redeemablesApi = createApi({
     reducerPath: 'redeemablesService',
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
     tagTypes: ['Redeemables'],
     refetchOnFocus: true,
     refetchOnMountOrArgChange: true,
     refetchOnReconnect: true,
     endpoints: (builder) => ({
          getRedeemables: builder.query<IRedeemable[], void>({
               query: () => '/redeemable',
          }),

          getRedeemableById: builder.query<IRedeemable, string>({
               query: (id) => `/redeemable/${id}`,
          }),

          tradeRedeemable: builder.mutation<
               IConfirmOrderResponse,
               IConfirmOrderRequest
          >({
               query: (payload) => ({
                    url: '/trade-history/trade',
                    method: 'POST',
                    body: payload,
               }),
          }),
     }),
});

export const {
     useGetRedeemablesQuery,
     useGetRedeemableByIdQuery,
     useTradeRedeemableMutation,
} = redeemablesApi;
