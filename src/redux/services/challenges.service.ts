import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
     AmIOnChallengeResponse,
     GetAllResponse,
     TakeChallengeDto,
     TakeChallengeResponse,
} from '../../challenges/interfaces/challenges.interfaces';
import { getAuthStateFromAsyncStorage } from '../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage';
import { environment } from '../../shared/environments/dev.environment';
import { IPagination } from '../../shared/interfaces/shared.interface';

export const challengesApi = createApi({
     reducerPath: 'challengesService',
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
     tagTypes: ['Challenge'],
     refetchOnFocus: true,
     refetchOnMountOrArgChange: true,
     refetchOnReconnect: true,
     endpoints: (builder) => ({
          getAllChallenges: builder.query<GetAllResponse, IPagination>({
               query: (pagination) =>
                    `/challenges/available?from=${pagination.from}&limit=${pagination.limit}`,
          }),
          getChallengeById: builder.query<void, string>({
               query: (id) => `/challenges/${id}`,
          }),
          amIOnChallenge: builder.query<
               AmIOnChallengeResponse,
               { challengeId: string; userId: string }
          >({
               query: ({ challengeId, userId }) =>
                    `/challenges/am-i-on-challenge/${challengeId}?userId=${userId}`,
          }),
          findMyChallenges: builder.query<
               void,
               { userId: string; done: boolean; challengeId: string }
          >({
               query: ({ userId, done, challengeId }) =>
                    `/challenges/my-challenges/${userId}?done=${done}&challengeId=${challengeId}`,
          }),
          takeChallenge: builder.mutation<
               TakeChallengeResponse,
               { challengeId: string; takeChallengeDto: TakeChallengeDto }
          >({
               query: ({ challengeId, takeChallengeDto }) => ({
                    url: `/challenges/take-challenge/${challengeId}`,
                    method: 'PATCH',
                    body: takeChallengeDto,
               }),
          }),
     }),
});

export const {
     useGetAllChallengesQuery,
     useGetChallengeByIdQuery,
     useAmIOnChallengeQuery,
     useFindMyChallengesQuery,
     useTakeChallengeMutation,
} = challengesApi;
