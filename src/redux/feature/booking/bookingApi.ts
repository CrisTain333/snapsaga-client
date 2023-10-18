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
    cancelBookingAdmin: builder.mutation({
      query: (id: any) => ({
        url: `/booking/cancel-booking/${id}`,
        method: `PATCH`,
      }),
      invalidatesTags: ["booking", "all_booking"],
    }),
    confirmBookingAdmin: builder.mutation({
      query: (id: any) => ({
        url: `/booking/confirm-booking/${id}`,
        method: `PATCH`,
      }),
      invalidatesTags: ["booking", "all_booking"],
    }),

    getBookings: builder.query({
      query: () => ({
        url: `/booking`,
        method: "GET",
      }),

      providesTags: ["booking"],
    }),
    getAllBookings: builder.query({
      query: (page: any) => ({
        url: `/booking/all-bookings?page=${page}`,
        method: "GET",
      }),

      providesTags: ["all_booking"],
    }),
  }),
});

export const {
  useCancelBookingAdminMutation,
  useConfirmBookingAdminMutation,
  useCancelBookingMutation,
  useCreateBookingMutation,
  useGetBookingsQuery,
  useGetAllBookingsQuery,
} = bookingApi;
