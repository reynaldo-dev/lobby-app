import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getAuthStateFromAsyncStorage } from "../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage";
import { GetEventByIDResponse } from './interfaces/getEventByIdResponse';

export const eventsApi = createApi({
  reducerPath: "eventsApi",
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


  tagTypes: ["Events"],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,



  endpoints: (builder) => ({
    getEventById: builder.query<GetEventByIDResponse, string>({
      query: (id: string) => `/events/${id}`,
    }),
  }),
});


export const { useGetEventByIdQuery } = eventsApi



