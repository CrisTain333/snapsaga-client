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
    // cancelBooking: builder.mutation({
    //   query: (id: any) => ({
    //     url: `/booking/${id}`,
    //     method: `DELETE`,
    //   }),
    //   invalidatesTags: ["booking"],
    // }),
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
  //   useCancelBookingMutation,
  useCreateFaqMutation,
  useGetFaqQuery,
} = faqApi;
