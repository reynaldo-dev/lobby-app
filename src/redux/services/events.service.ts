import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IGetMyEventsResponse } from '../../events/interfaces/get-my-events';
import {
     GetEventByIDResponse,
     IEnrollEventResponse,
     IEventQr,
     IScanQrResponse,
} from '../../events/interfaces/getEventByIdResponse';
import { IUpcomingEvents } from '../../events/interfaces/upcoming-events';
import { getAuthStateFromAsyncStorage } from '../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { environment } from '../../shared/environments/dev.environment';
import { IInactiveEvents } from '../../shared/interfaces/shared.interface';

export const eventsApi = createApi({
     reducerPath: 'eventsApi',
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
          getInactiveEvents: builder.query<IInactiveEvents[], string>({
               query: (id: string) =>
                    `/events/inactive-events-with-attendance/${id}`,
          }),

          getUpcomingEvents: builder.query<IUpcomingEvents[], string>({
               query: (fromDate: string) =>
                    `/events/at-date?fromDate=${fromDate}&ignoreUserRole=true`,
          }),

          enrollToEvent: builder.mutation<
               {},
               { userId: string; eventId: string }
          >({
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
               query: ({ userId, eventId }) =>
                    `/events/${eventId}/isEnrolled/${userId}`,
          }),
          scanQRCode: builder.mutation<
               { message: string },
               { eventId: string; userId: string }
          >({
               query: ({ userId, eventId }) => ({
                    url: `/events/${eventId}/scan/${userId}`,
                    method: 'POST',
               }),
          }),
          scanAndRedeemTicket: builder.mutation<
               IScanQrResponse,
               { userId: string; qrCodeId: string }
          >({
               query: ({ userId, qrCodeId }) => ({
                    url: `/events/redeem/${qrCodeId}/user/${userId}`,
                    method: 'POST',
               }),
          }),
     }),
});

export const {
     useGetEventByIdQuery,
     useCancelEnrollmentToEventMutation,
     useGetMyEventsQuery,
     useGetInactiveEventsQuery,
     useGetUpcomingEventsQuery,
     useEnrollToEventMutation,
     useIsEnrolledToEventQuery,
     useGetEventQRByIdQuery,
     useScanQRCodeMutation,
     useScanAndRedeemTicketMutation,
} = eventsApi;
