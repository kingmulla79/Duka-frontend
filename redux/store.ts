"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import orderSlice from "./features/orders/ordersSlice";
import productsSlice from "./features/products/productsSlice";
import { authAPI } from "./features/auth/authAPI";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    order: orderSlice,
    products: productsSlice,
  },
  devTools: false, // disables redux devtools
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the refresh token on every page load
const initializeApp = async () => {
  await store.dispatch(
    authAPI.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
