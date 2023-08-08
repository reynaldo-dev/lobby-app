import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthStateFromAsyncStorage } from "../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage";
import { ICommunity } from "../../../interfaces/community.interface";
import { GetCommunityByIDResponse } from "./interfaces/community-response.interface";

export const communitiesService = createApi({
  reducerPath: "communitiesService",
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
  tagTypes: ["Communities"],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
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
        method: "POST",
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
        method: "DELETE",
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
