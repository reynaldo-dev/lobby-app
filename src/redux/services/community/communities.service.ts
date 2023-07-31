import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICommunity } from '../../../interfaces/community.interface';
import { GetCommunityByIDResponse } from './interfaces/community-response.interface';

export const communitiesService = createApi({
  reducerPath: 'communitiesService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://2955-138-186-250-135.ngrok-free.app/api',
  }),
  tagTypes: ['Communities'],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getCommunities: builder.query<ICommunity, void>({
      query: () => '/communities',
    }),
    getCountMembers: builder.query<void, String>({
      query: (id: string) => `/communities/${id}/members/count`,
    }),
    getSearchCommunities: builder.query<ICommunity, String>({
      query: (name: string) => `/communities/search/${name}`,
    }),
    getCommunityById: builder.query<GetCommunityByIDResponse, String>({
      query: (id: string) => `/communities/${id}`,
    }),

    imIInCommuity: builder.query<
      boolean,
      { userId: string; communityId: string }
    >({
      query: (payload) =>
        `/user-community/user-in-community?communityId=${payload.communityId}&userId=${payload.userId}`,
    }),

    joinCommunity: builder.mutation<
      any,
      { userId: string; communityId: string }
    >({
      query: (payload) => ({
        url: `/user-community`,
        method: 'POST',
        body: {
          userId: payload.userId,
          communityId: payload.communityId,
        },
      }),
    }),

    leaveCommunity: builder.mutation<
      any,
      { userId: string; communityId: string }
    >({
      query: (payload) => ({
        url: `/user-community/community/${payload.communityId}/user/${payload.userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCommunitiesQuery,
  useGetCountMembersQuery,
  useLazyGetSearchCommunitiesQuery,
  useGetCommunityByIdQuery,
  useImIInCommuityQuery,
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
} = communitiesService;
