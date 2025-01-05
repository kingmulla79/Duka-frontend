/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import { userOrderRequest, adminOrderRequest } from "./ordersSlice";

export const orderAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: (data) => ({
        url: "order/new-order",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    userOrders: builder.query({
      query: () => ({
        url: "order/get-user-orders",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userOrderRequest({
              orders: result.data.orders,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    adminOrders: builder.query({
      query: () => ({
        url: "order/get-all-orders",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            adminOrderRequest({
              allOrders: result.data.orders,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useNewOrderMutation, useUserOrdersQuery, useAdminOrdersQuery } =
  orderAPI;
