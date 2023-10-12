import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getAuthStateFromAsyncStorage } from "../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage";
import { User } from "../../slices/user/user.interface";
import {
  IPasswordUpdatePayload,
  IPasswordUpdateResponse,
} from "./interfaces/password-update";
import {
  UpdateProfilePayload,
  UpdateProfileResponse,
} from "./interfaces/update-profile";
import { GetUserByFullNameArgs } from "./interfaces/user-search";
import { ICurrentLeague } from "./interfaces/current-league.interface";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://e09d-190-150-88-140.ngrok-free.app/api",
    prepareHeaders: async (headers) => {
      const bearerToken = await getAuthStateFromAsyncStorage();
      if (bearerToken) {
        headers.set("authorization", bearerToken);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserByFullName: builder.query<User[], GetUserByFullNameArgs>({
      query: ({ query, from = 0, limit = 10 }) =>
        `/user/search?query=${query}&from=${from}&limit=${limit}`,
    }),
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfilePayload
    >({
      query: (payload) => ({
        url: `/user/${payload.id}`,
        method: "PATCH",
        body: {
          name: payload.name,
          lastname: payload.lastname,
          email: payload.email,
          phone: payload.phone,
          department: payload.department,
          city: payload.city,
        },
      }),
    }),
    updatePassword: builder.mutation<
      IPasswordUpdateResponse,
      IPasswordUpdatePayload
    >({
      query: (payload) => ({
        url: `/user/password-update/${payload.id}`,
        method: "PUT",
        body: {
          lastPassword: payload.currentPassword,
          newPassword: payload.newPassword,
        },
      }),
    }),

    getCurrentCredits: builder.query<{ credits: number }, string>({
      query: (userId) => `/user/current-credits/${userId}`,
    }),

    getCurrentRecognitionsCount: builder.query<
      { recognitionsReceivedCount: number },
      string
    >({
      query: (userId) => `/user/current-recognitions-count/${userId}`,
    }),

    getCurrentLeague: builder.query<ICurrentLeague, string>({
      query: (userId) => `/user/current-league/${userId}`,
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useLazyGetUserByFullNameQuery,
  useGetCurrentCreditsQuery,
  useGetCurrentRecognitionsCountQuery,
  useGetCurrentLeagueQuery,
} = userApi;
