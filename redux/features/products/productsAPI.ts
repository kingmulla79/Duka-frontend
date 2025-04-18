/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import {
  allCategories,
  allProductsRequest,
  updateProducts,
} from "./productsSlice";

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
    getProductAnalytics: builder.query({
      query: () => ({
        url: `prod/get-product-analytics`,
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            allCategories({
              product_categories: result.data.product_categories,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    productSearchNameFilter: builder.query({
      query: () => ({
        url: `prod/get-product-search-name`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    productSearchResults: builder.query({
      query: (search_name) => ({
        url: `prod/get-product-search-results/${search_name}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    productAbstractFilter: builder.query({
      query: ({ column, pattern }) => ({
        url: `prod/product-search-filter/filter_details?column=${column}&pattern=${pattern}`,
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
    stripeIntent: builder.mutation({
      query: (data) => ({
        url: "prod/payment-intent",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
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
  useGetProductAnalyticsQuery,
  useProductSearchNameFilterQuery,
  useProductSearchResultsQuery,
  useProductAbstractFilterQuery,
  useStripeIntentMutation,
} = productAPI;
