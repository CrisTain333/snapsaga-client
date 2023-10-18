/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";

export const serviceApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    getService: builder.query({
      query: (page: number) => ({
        url: `/service/best-services?page=${page}`,
        method: "GET",
      }),

      providesTags: ["service"],
    }),
    updateService: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/service/${id}`,
        method: `PATCH`,
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const { useGetServiceQuery, useUpdateServiceMutation } =
  serviceApi;
