/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/api";

export const userApi = api.injectEndpoints({
  endpoints: (builder: any) => ({
    registerUser: builder.mutation({
      query: (data: any) => ({
        url: `/auth/register`,
        method: `POST`,
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (credential: any) => ({
        url: "/auth/login",
        method: `POST`,
        body: credential,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = userApi;
