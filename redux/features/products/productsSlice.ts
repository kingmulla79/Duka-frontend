import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: "",
  categories: "",
  category_id: "",
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
    categorySelect: (state, action) => {
      state.category_id = action.payload;
    },
  },
});

export const {
  allProductsRequest,
  updateProducts,
  allCategories,
  categorySelect,
} = productsSlice.actions;

export default productsSlice.reducer;
