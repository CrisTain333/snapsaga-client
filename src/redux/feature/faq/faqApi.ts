/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";

export const faqApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    createFaq: builder.mutation({
      query: (data: any) => ({
        url: "/faq",
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/faq/${id}`,
        method: `PATCH`,
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    deleteFaq: builder.mutation({
      query: (id: any) => ({
        url: `/faq/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["faq"],
    }),
    getFaq: builder.query({
      query: () => ({
        url: `/faq`,
        method: "GET",
      }),

      providesTags: ["faq"],
    }),
  }),
});

export const {
  useDeleteFaqMutation,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useGetFaqQuery,
} = faqApi;
