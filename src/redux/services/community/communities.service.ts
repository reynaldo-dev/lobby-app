import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthStateFromAsyncStorage } from "../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage";
import {
  ICommunity,
  IUserCommunity,
} from "../../../interfaces/community.interface";
import {
  CountMembersResponse,
  GetCommunityByIDResponse,
} from "./interfaces/community-response.interface";

export const communitiesService = createApi({
  reducerPath: "communitiesService",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://0075-190-150-88-140.ngrok-free.app/api",
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
    getCommunities: builder.query<ICommunity[], void>({
      query: () => "/communities",
    }),
    getCountMembers: builder.query<CountMembersResponse, String>({
      query: (id: string) => `/communities/${id}/members/count`,
    }),
    getSearchCommunities: builder.query<ICommunity[], String>({
      query: (name: string) => `/communities/search/${name}`,
    }),
    getCommunityById: builder.query<GetCommunityByIDResponse, String>({
      query: (id: string) => `/communities/${id}`,
    }),

    getCommunitiesByUserId: builder.query<IUserCommunity[], String>({
      query: (id: string) => `/user-community/users/${id}/communities`,
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
  useGetCommunitiesByUserIdQuery,
  useImIInCommuityQuery,
  useJoinCommunityMutation,
  useLeaveCommunityMutation,
} = communitiesService;
