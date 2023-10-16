/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";

export const bookingApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    createBooking: builder.mutation({
      query: (data: any) => ({
        url: "/booking",
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
    cancelBooking: builder.mutation({
      query: (id: any) => ({
        url: `/booking/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["booking"],
    }),
    getBookings: builder.query({
      query: () => ({
        url: `/booking`,
        method: "GET",
      }),

      providesTags: ["booking"],
    }),
  }),
});

export const {
  useCancelBookingMutation,
  useCreateBookingMutation,
  useGetBookingsQuery,
} = bookingApi;
