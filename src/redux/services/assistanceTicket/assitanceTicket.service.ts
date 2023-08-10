import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthStateFromAsyncStorage } from "../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage";
import { IPagination } from "../../../shared/interfaces/shared.interface";
import {
  IAssistanceTicket,
  IAssistanceTicketByUserIDResponse,
  IAssistanceTicketListResponse,
  IAssistanceTicketResponse,
} from "./interfaces/assistanceTicket.interface";
import { ICalendarEventsResponse } from "../events/interfaces/getEventByIdResponse";

export const assistanceTicketApi = createApi({
  reducerPath: "assistanceTicketService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://172.27.48.1:4000/api",
    prepareHeaders: async (headers) => {
      const bearerToken = await getAuthStateFromAsyncStorage();
      if (bearerToken) {
        headers.set("authorization", bearerToken);
      }

      return headers;
    },
  }),
  tagTypes: ["AssistanceTicket"],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createTicket: builder.mutation<
      IAssistanceTicketListResponse,
      IAssistanceTicket
    >({
      query: (newTicket) => ({
        url: "/assistance-tickets",
        method: "POST",
        body: newTicket,
      }),
    }),
    getTickets: builder.query<IAssistanceTicketListResponse, IPagination>({
      query: ({ from = 0, limit = 10 }) => ({
        url: "/assistance-tickets",
        params: { from, limit },
      }),
    }),
    getTicketsByUserId: builder.query<
      IAssistanceTicketByUserIDResponse[],
      string
    >({
      query: (userId) => `/assistance-tickets/user/${userId}`,
    }),
    getTicketById: builder.query<IAssistanceTicketResponse, string>({
      query: (id) => `/assistance-tickets/${id}`,
    }),
    getMyEventsCalendar: builder.query<ICalendarEventsResponse[], string>({
      query: (id) => `/assistance-tickets/my-events-calendar/${id}`,
    }),
    updateTicket: builder.mutation<
      IAssistanceTicketResponse,
      { id: string; updateTicketDto: IAssistanceTicket }
    >({
      query: ({ id, updateTicketDto }) => ({
        url: `/assistance-tickets/${id}`,
        method: "PATCH",
        body: updateTicketDto,
      }),
    }),
    deleteTicket: builder.mutation<IAssistanceTicketResponse, string>({
      query: (id) => ({
        url: `/assistance-tickets/${id}`,
        method: "DELETE",
      }),
    }),
    redeemTicket: builder.mutation<IAssistanceTicketResponse, string>({
      query: (id) => ({
        url: `/assistance-tickets/${id}/redeem`,
        method: "POST",
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
  useGetMyEventsCalendarQuery,
} = assistanceTicketApi;
