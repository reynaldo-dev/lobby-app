import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthStateFromAsyncStorage } from "../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage";
import {
  ICreateRecognitionDto,
  IRecognition,
  IRecognitionCategory,
  IRecognitionHistory,
} from "../../recognitions/interfaces/recognitions.interface";
import { environment } from "../../shared/environments/dev.environment";

export const recognitionsApi = createApi({
  reducerPath: "recognitionsService",
  baseQuery: fetchBaseQuery({
    baseUrl: environment.api_url,
    prepareHeaders: async (headers) => {
      const bearerToken = await getAuthStateFromAsyncStorage();
      if (bearerToken) {
        headers.set("authorization", bearerToken);
      }
      return headers;
    },
  }),
  tagTypes: ["Recognition"],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    createRecognition: builder.mutation<IRecognition, ICreateRecognitionDto>({
      query: (newRecognition) => ({
        url: "/recognitions",
        method: "POST",
        body: newRecognition,
      }),
    }),
    getAllRecognitions: builder.query<IRecognition[], void>({
      query: () => "/recognition",
    }),
    getReceivedRecognitions: builder.query<IRecognition[], string>({
      query: (userId) => `/recognitions/received-recognitions/${userId}`,
    }),
    getGivenRecognitions: builder.query<IRecognition[], string>({
      query: (userId) => `/recognitions/given-recognitions/${userId}`,
    }),
    getRecognitionById: builder.query<IRecognition, string>({
      query: (id) => `/recognition/${id}`,
    }),
    getRecognitionCategories: builder.query<IRecognitionCategory[], void>({
      query: () => "/recognition-category",
    }),
    findByRecognitionsCategory: builder.query<
      IRecognitionHistory[],
      { id: string; category?: string; withRecognitions?: boolean }
    >({
      query: ({ id, category, withRecognitions }) => ({
        url: `/user-credit-history/user/${id}/recognitions`,
        params: { category, withRecognitions },
      }),
    }),
    markRecognitionAsRead: builder.mutation<void, string>({
      query: (id) => ({
        url: `/recognitions/${id}/read`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateRecognitionMutation,
  useGetAllRecognitionsQuery,
  useGetReceivedRecognitionsQuery,
  useGetGivenRecognitionsQuery,
  useGetRecognitionByIdQuery,
  useGetRecognitionCategoriesQuery,
  useFindByRecognitionsCategoryQuery,
  useMarkRecognitionAsReadMutation,
} = recognitionsApi;
