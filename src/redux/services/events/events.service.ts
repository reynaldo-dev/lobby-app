import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAuthStateFromAsyncStorage } from '../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import {
  GetEventByIDResponse,
  IEnrollEventResponse,
  IEventQr,
} from './interfaces/getEventByIdResponse';
import { IGetMyEventsResponse } from './interfaces/get-my-events';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://0f1d-138-186-250-119.ngrok-free.app/api',
    prepareHeaders: async (headers) => {
      const bearerToken = await getAuthStateFromAsyncStorage();
      if (bearerToken) {
        headers.set('authorization', bearerToken);
      }
      return headers;
    },
  }),
  tagTypes: ['Events'],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getEventById: builder.query<GetEventByIDResponse, string>({
      query: (id: string) => `/events/${id}`,
    }),

    getMyEvents: builder.query<IGetMyEventsResponse[], string>({
      query: (userId: string) => `/events/my-events/${userId}`,
    }),

    getEventQRById: builder.query<IEventQr, string>({
      query: (id: string) => `/event-qr/qr-event/${id}`,
    }),

    enrollToEvent: builder.mutation<{}, { userId: string; eventId: string }>({
      query: ({ userId, eventId }) => ({
        url: `/events/${eventId}/enroll/${userId}`,
        method: 'POST',
      }),
    }),
    cancelEnrollmentToEvent: builder.mutation<
      IEnrollEventResponse,
      { userId: string; eventId: string }
    >({
      query: ({ userId, eventId }) => ({
        url: `/events/${eventId}/cancel/${userId}`,
        method: 'DELETE',
      }),
    }),
    isEnrolledToEvent: builder.query<
      boolean,
      { userId: string; eventId: string }
    >({
      query: ({ userId, eventId }) => `/events/${eventId}/isEnrolled/${userId}`,
    }),
  }),
});

export const {
  useGetEventByIdQuery,
  useCancelEnrollmentToEventMutation,
  useEnrollToEventMutation,
  useIsEnrolledToEventQuery,
  useGetMyEventsQuery,
  useGetEventQRByIdQuery,
} = eventsApi;
