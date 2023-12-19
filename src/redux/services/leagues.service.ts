import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthStateFromAsyncStorage } from '../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import {
     ILeague,
     IRanking,
     IRankingHistoric,
     IUserInLeague,
     UserData,
} from '../../ranking/interfaces/league.interfaces';
import { environment } from '../../shared/environments/dev.environment';

export const leaguesApi = createApi({
     reducerPath: 'leaguesService',
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
     tagTypes: ['League'],
     refetchOnFocus: true,
     refetchOnMountOrArgChange: true,
     refetchOnReconnect: true,
     endpoints: (builder) => ({
          getCurrentRanking: builder.query<IRanking, string>({
               query: (userId) => `/leagues/rankingApp/${userId}`,
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
          getRankingByCategoryId: builder.query<IRanking, string>({
               query: (categoryId) => `leagues/ranking/category/${categoryId}`,
          }),
          getMonthlyRanking: builder.query<
               IRanking,
               { month?: number; year?: number; userId?: string }
          >({
               query: ({ month, year, userId }) =>
                    `/leagues/ranking/monthly/${month}/${year}/${userId}`,
          }),
          getAnnualRanking: builder.query<IRanking, { year?: number }>({
               query: ({ year }) => `/leagues/ranking/annual/${year}`,
          }),
          getAnnualRankingByCategoryId: builder.query<
               IRanking,
               { year?: number; userId: string; categoryId: string }
          >({
               query: ({ year, userId, categoryId }) =>
                    `/leagues/ranking/annual/${year}/${userId}/${categoryId}`,
          }),
          getWeeklyRanking: builder.query<IRanking, void>({
               query: () => `/leagues/ranking/weekly`,
          }),
     }),
});

export const {
     useGetCurrentRankingQuery,
     useGetAllLeaguesQuery,
     useGetUsersInLeagueQuery,
     useGetLeagueByIdQuery,
     useFindLeagueByNameQuery,
     useGetAnnualRankingQuery,
     useGetMonthlyRankingQuery,
     useGetWeeklyRankingQuery,
     useLazyGetRankingByCategoryIdQuery,
     useLazyGetAnnualRankingByCategoryIdQuery,
} = leaguesApi;
