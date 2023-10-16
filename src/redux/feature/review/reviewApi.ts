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
    // getBookings: builder.query({
    //   query: () => ({
    //     url: `/booking`,
    //     method: "GET",
    //   }),

    //   providesTags: ["booking"],
    // }),
  }),
});

export const {
  //   useCancelBookingMutation,
  useCreateReviewMutation,
  //   useGetBookingsQuery,
} = reviewApi;
