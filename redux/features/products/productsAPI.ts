/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import { allProductsRequest, updateProducts } from "./productsSlice";

export const productAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newProduct: builder.mutation({
      query: (data) => ({
        url: "prod/add-product",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `prod/update-product/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(updateProducts());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `prod/get-products`,
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            allProductsRequest({
              products: result.data.products,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getProductsById: builder.query({
      query: (id) => ({
        url: `prod/get-product/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `prod/delete-product/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(updateProducts());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    newProductCategory: builder.mutation({
      query: (data) => ({
        url: "prod/add-product-category",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getProductCategories: builder.query({
      query: () => ({
        url: "prod/get-product-categories",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateProductCategory: builder.mutation({
      query: (data) => ({
        url: `prod/update-product-category/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(updateProducts());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    deleteProductCategory: builder.mutation({
      query: (id) => ({
        url: `prod/delete-product-category/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { dispatch }) {
        try {
          dispatch(updateProducts());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useNewProductMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
  useGetProductsByIdQuery,
  useDeleteProductMutation,
  useNewProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useGetProductCategoriesQuery,
} = productAPI;
