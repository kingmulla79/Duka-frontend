import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    allProductsRequest: (state, action) => {
      state.products = action.payload.products;
    },
    updateProducts: (state) => {
      state.products = "";
    },
  },
});

export const { allProductsRequest, updateProducts } = productsSlice.actions;

export default productsSlice.reducer;
