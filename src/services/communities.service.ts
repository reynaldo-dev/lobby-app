import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICommunity } from '../interfaces/community.interface';

export const communitiesService = createApi({
  reducerPath: 'communitiesService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://e45d-138-186-250-179.ngrok-free.app/api',
  }),
  endpoints: (builder) => ({
    getCommunities: builder.query<ICommunity, void>({
      query: () => '/communities',
    }),
    getCountMembers: builder.query<void, String>({
      query: (id: string) => `/communities/${id}/members/count`,
    }),
  }),
});

export const { useGetCommunitiesQuery, useGetCountMembersQuery } =
  communitiesService;
