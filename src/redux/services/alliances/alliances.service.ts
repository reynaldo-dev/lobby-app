import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthStateFromAsyncStorage } from '../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { IAlliances } from '../../../shared/interfaces/shared.interface';

export const alliancesApi = createApi({
  reducerPath: 'alliancesService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://b8f8-138-186-250-181.ngrok-free.app/api',
    prepareHeaders: async (headers) => {
      const bearerToken = await getAuthStateFromAsyncStorage();
      if (bearerToken) {
        headers.set('authorization', bearerToken);
      }
      return headers;
    },
  }),
  tagTypes: ['Alliances'],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getAlliances: builder.query<IAlliances[], void>({
      query: () => '/alliance',
    }),
  }),
});
export const { useGetAlliancesQuery } = alliancesApi;
