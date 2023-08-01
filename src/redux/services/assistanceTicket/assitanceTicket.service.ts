import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IAssistanceTicket,
  IAssistanceTicketResponse,
  IAssistanceTicketByUserIDResponse,
  IAssistanceTicketListResponse,
} from './interfaces/assistanceTicket.interface';
import { IPagination } from '../../../shared/interfaces/shared.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const assistanceTicketApi = createApi({
  reducerPath: 'assistanceTicketService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://c39e-138-186-250-135.ngrok-free.app/api',
    prepareHeaders: async (headers) => {
      const authStateString = await AsyncStorage.getItem('authState');
      if (authStateString !== null) {
        const authState = JSON.parse(authStateString);
        if (authState.access_token) {
          headers.set('authorization', `Bearer ${authState.access_token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ['AssistanceTicket'],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createTicket: builder.mutation<
      IAssistanceTicketListResponse,
      IAssistanceTicket
    >({
      query: (newTicket) => ({
        url: '/assistance-tickets',
        method: 'POST',
        body: newTicket,
      }),
    }),
    getTickets: builder.query<IAssistanceTicketListResponse, IPagination>({
      query: ({ from = 0, limit = 10 }) => ({
        url: '/assistance-tickets',
        params: { from, limit },
      }),
    }),
    getTicketsByUserId: builder.query<
      IAssistanceTicketByUserIDResponse[],
      string
    >({
      query: (userId) => `assistance-tickets/user/${userId}`,
    }),
    getTicketById: builder.query<IAssistanceTicketResponse, string>({
      query: (id) => `assistance-tickets/${id}`,
    }),
    updateTicket: builder.mutation<
      IAssistanceTicketResponse,
      { id: string; updateTicketDto: IAssistanceTicket }
    >({
      query: ({ id, updateTicketDto }) => ({
        url: `/assistance-tickets/${id}`,
        method: 'PATCH',
        body: updateTicketDto,
      }),
    }),
    deleteTicket: builder.mutation<IAssistanceTicketResponse, string>({
      query: (id) => ({
        url: `/assistance-tickets/${id}`,
        method: 'DELETE',
      }),
    }),
    redeemTicket: builder.mutation<IAssistanceTicketResponse, string>({
      query: (id) => ({
        url: `/assistance-tickets/${id}/redeem`,
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
} = assistanceTicketApi;
