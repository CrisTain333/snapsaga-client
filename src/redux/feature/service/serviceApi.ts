/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";

export const serviceApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    getService: builder.query({
      query: () => ({
        url: `/service/best-services`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetServiceQuery } = serviceApi;
