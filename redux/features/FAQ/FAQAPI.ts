import { apiSlice } from "../api/apiSlice";

export const FAQAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    newFAQ: builder.mutation({
      query: (data) => ({
        url: "faq/new-faq",
        method: "POST",
        credentials: "include" as const,
        body: data,
      }),
    }),
    editFAQ: builder.mutation({
      query: (data) => ({
        url: `faq/edit-faq/${data.id}`,
        method: "PUT",
        credentials: "include" as const,
        body: data,
      }),
    }),
    getFAQs: builder.query({
      query: () => ({
        url: `faq/get-faqs`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteFAQ: builder.mutation({
      query: (id) => ({
        url: `faq/delete-faq/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useNewFAQMutation,
  useEditFAQMutation,
  useGetFAQsQuery,
  useDeleteFAQMutation,
} = FAQAPI;
