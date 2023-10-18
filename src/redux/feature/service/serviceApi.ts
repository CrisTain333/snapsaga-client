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
    createService: builder.mutation({
      query: (data: any) => ({
        url: `/service/create`,
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
    deleteService: builder.mutation({
      query: (id: any) => ({
        url: `/service/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useGetServiceQuery,
  useUpdateServiceMutation,
  useCreateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
