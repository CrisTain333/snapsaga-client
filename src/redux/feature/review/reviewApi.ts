/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";

export const reviewApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    createReview: builder.mutation({
      query: (data: any) => ({
        url: "/review",
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    // cancelBooking: builder.mutation({
    //   query: (id: any) => ({
    //     url: `/booking/${id}`,
    //     method: `DELETE`,
    //   }),
    //   invalidatesTags: ["booking"],
    // }),
    getReview: builder.query({
      query: (id: any) => ({
        url: `/review/${id}`,
        method: "GET",
      }),

      providesTags: ["review"],
    }),
  }),
});

export const {
  //   useCancelBookingMutation,
  useCreateReviewMutation,
  useGetReviewQuery,
} = reviewApi;
