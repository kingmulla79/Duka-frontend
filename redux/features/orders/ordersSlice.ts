import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userOrders: "",
  allOrders: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    userOrderRequest: (state, action) => {
      state.userOrders = action.payload.orders;
    },
    adminOrderRequest: (state, action) => {
      state.allOrders = action.payload.orders;
    },
  },
});

export const { userOrderRequest, adminOrderRequest } = orderSlice.actions;

export default orderSlice.reducer;
