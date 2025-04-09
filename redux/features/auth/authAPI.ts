/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import {
  userList,
  userLoggedIn,
  userLoggedOut,
  userRegistration,
} from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: (data) => ({
        url: "auth/user-activation",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
              accessToken: result.data.accessToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.query({
      query: () => ({
        url: "auth/logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "auth/get-user-info",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          //from the reducer to change the global state to include fetched values
          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getAllUsersInfo: builder.query({
      query: () => ({
        url: `auth/get-all-users-info`,
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          //from the reducer to change the global state to include fetched values
          dispatch(userList({ userList: result.data.users }));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getUserAnalytics: builder.query({
      query: () => ({
        url: `auth/get-users-analytics`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    socialAuth: builder.mutation({
      query: (data) => ({
        url: "auth/social-auth",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result.data.user,
              accessToken: result.data.accessToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    updateDetails: builder.mutation({
      query: (data) => ({
        url: `auth/update-info`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `auth/update-password`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateProfilePic: builder.mutation({
      query: (data) => ({
        url: `auth/update-profile-pic`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `auth/update-user-role`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `auth/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    sendResetEmail: builder.mutation({
      query: (data) => ({
        url: `auth/send-reset-email`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `auth/forgot-password/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useLogoutUserQuery,
  useGetAllUsersInfoQuery,
  useLoadUserQuery,
  useSocialAuthMutation,
  useUpdateDetailsMutation,
  useUpdatePasswordMutation,
  useUpdateProfilePicMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useSendResetEmailMutation,
  useResetPasswordMutation,
  useGetUserAnalyticsQuery,
} = authAPI;
