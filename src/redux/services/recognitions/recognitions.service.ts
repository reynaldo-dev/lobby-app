import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthStateFromAsyncStorage } from "../../../helpers/get-auth-state-from-asyncStorage/getAuthStatateFromAsyncStorage";
import {
  ICreateRecognitionDto,
  IRecognition,
  IRecognitionCategory,
  IRecognitionHistory,
} from "./interfaces/recognitions.interface";

export const recognitionsApi = createApi({
  reducerPath: "recognitionsService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://bf09-138-186-250-181.ngrok-free.app/api",
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
} = recognitionsApi;
