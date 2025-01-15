import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: "",
  categories: "",
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
    allCategories: (state, action) => {
      state.categories = action.payload.product_categories;
    },
  },
});

export const { allProductsRequest, updateProducts, allCategories } =
  productsSlice.actions;

export default productsSlice.reducer;
