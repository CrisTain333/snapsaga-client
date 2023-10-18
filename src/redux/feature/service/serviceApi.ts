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
  }),
});

export const { useGetServiceQuery } = serviceApi;
