import { apiSlice } from "../api/apiSlice";

export const notificationAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allNotifications: builder.query({
      query: () => ({
        url: "notification/get-all-notifications",
        method: "get",
        credentials: "include" as const,
      }),
    }),
    updateNotification: builder.mutation({
      query: (id) => ({
        url: `notification/edit-notification/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useAllNotificationsQuery, useUpdateNotificationMutation } =
  notificationAPI;
