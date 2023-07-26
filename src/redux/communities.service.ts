import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICommunity } from "../interfaces/community.interface";

export const communitiesService = createApi({
  reducerPath: "communitiesService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.13:4000/api",
  }),
  endpoints: (builder) => ({
    getCommunities: builder.query<ICommunity, void>({
      query: () => "/communities",
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
