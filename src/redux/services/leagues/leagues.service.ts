import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthStateFromAsyncStorage } from '../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import {
  IRanking,
  ILeague,
  IUserInLeague,
} from './interfaces/league.interfaces';

export const leaguesApi = createApi({
  reducerPath: 'leaguesService',
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
  tagTypes: ['League'],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getCurrentRanking: builder.query<IRanking, void>({
      query: () => '/leagues/ranking',
    }),
    getAllLeagues: builder.query<ILeague[], void>({
      query: () => '/leagues',
    }),
    getUsersInLeague: builder.query<IUserInLeague, string>({
      query: (leagueId) => `/leagues/${leagueId}/users`,
    }),
    getLeagueById: builder.query<ILeague, string>({
      query: (leagueId) => `/leagues/${leagueId}`,
    }),
    findLeagueByName: builder.query<ILeague, string>({
      query: (leagueName) => `/leagues/name/${leagueName}`,
    }),
  }),
});

export const {
  useGetCurrentRankingQuery,
  useGetAllLeaguesQuery,
  useGetUsersInLeagueQuery,
  useGetLeagueByIdQuery,
  useFindLeagueByNameQuery,
} = leaguesApi;
