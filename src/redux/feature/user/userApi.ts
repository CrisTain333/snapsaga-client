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
      invalidatesTags: ["user", "admins"],
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
    makeAdmin: builder.mutation({
      query: ({ email, role }: any) => ({
        url: `/user/admin/update-role/${email}`,
        method: `PATCH`,
        body: role,
      }),
      invalidatesTags: ["user", "admins"],
    }),
    getAllUser: builder.query({
      query: (page: any) => ({
        url: `/user/all-users?page=${page}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllAdmin: builder.query({
      query: (page: any) => ({
        url: `/user/admins?page=${page}`,
        method: "GET",
      }),
      providesTags: ["admins", "user"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
  useMakeAdminMutation,
  useUpdateProfilePictureMutation,
  useUpdateProfileDataMutation,
  useDeleteProfileDataMutation,
  useGetAllUserQuery,
  useGetAllAdminQuery,
} = userApi;
