/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";

export const commentAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProductComments: builder.query({
      query: (product_id) => ({
        url: `comments/get-product-comments/${product_id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    newComment: builder.mutation({
      query: (data) => ({
        url: "comments/new-comment",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useFetchProductCommentsQuery, useNewCommentMutation } =
  commentAPI;
