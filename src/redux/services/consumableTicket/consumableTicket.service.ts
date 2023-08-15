import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthStateFromAsyncStorage } from '../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { IPagination } from '../../../shared/interfaces/shared.interface';
import {
  ConsumableTicketData,
  IConsumableTicketRedeem,
  IConsumableTicketResponse,
  IconsumableTicket,
} from './interfaces/consumablesTickets.interface';

export const consumablesTicketsApi = createApi({
  reducerPath: 'consumablesTicketsService',
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
  tagTypes: ['ConsumablesTicket'],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createTicket: builder.mutation<any, IconsumableTicket>({
      query: (newTicket) => ({
        url: '/consumables-tickets',
        method: 'POST',
        body: newTicket,
      }),
    }),
    getTickets: builder.query<IConsumableTicketResponse, IPagination>({
      query: ({ from = 0, limit = 10 }) => ({
        url: '/consumables-tickets',
        params: { from, limit },
      }),
    }),
    getTicketsByUserId: builder.query<ConsumableTicketData[], string>({
      query: (userId) => `consumables-tickets/user/${userId}`,
    }),
    getTicketById: builder.query<ConsumableTicketData, string>({
      query: (id) => `consumables-tickets/${id}`,
    }),
    updateTicket: builder.mutation<any, { id: string; updateTicket: any }>({
      query: ({ id, updateTicket: updateTicketData }) => ({
        url: `/consumables-tickets/${id}`,
        method: 'PATCH',
        body: updateTicketData,
      }),
    }),
    deleteTicket: builder.mutation<any, string>({
      query: (id) => ({
        url: `/consumables-tickets/${id}`,
        method: 'DELETE',
      }),
    }),
    redeemTicket: builder.mutation<IConsumableTicketRedeem, string>({
      query: (id) => ({
        url: `/consumables-tickets/${id}/redeem`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketsByUserIdQuery,
  useGetTicketByIdQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useRedeemTicketMutation,
} = consumablesTicketsApi;
