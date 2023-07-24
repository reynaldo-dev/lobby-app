import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICommunity } from '../interfaces/community.interface';

export const communitiesService = createApi({
  reducerPath: 'communitiesService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://dd11-138-186-250-179.ngrok-free.app/api',
  }),
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
  }),
});

export const {
  useGetCommunitiesQuery,
  useGetCountMembersQuery,
  useLazyGetSearchCommunitiesQuery,
} = communitiesService;
