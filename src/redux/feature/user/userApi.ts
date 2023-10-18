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
    updateProfilePicture: builder.mutation({
      query: (data: any) => ({
        url: "/user/update-profile",
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateProfileData: builder.mutation({
      query: (data: any) => ({
        url: "/user/update-profile-data",
        method: `POST`,
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteProfileData: builder.mutation({
      query: (id: any) => ({
        url: `/user/${id}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["user"],
    }),
    updateProfile: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/user/${id}`,
        method: `PATCH`,
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: () => ({
        url: `/user/all-users`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useUpdateProfileDataMutation,
  useDeleteProfileDataMutation,
  useGetAllUserQuery,
} = userApi;
