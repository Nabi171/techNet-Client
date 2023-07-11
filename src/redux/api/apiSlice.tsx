import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//route for api fetch from backend application
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['comments'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    singleProduct: builder.query<object,string>({
      query: (id) => `/product/${id}`,
    }),
    postComment: builder.mutation({
      query:({id,data})=>( {
        
          url: `/comment/${id}`,
          method: 'POST',
          body:data,
        
      }),
  
      // invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const { useGetCommentQuery,useGetProductsQuery, useSingleProductQuery,usePostCommentMutation } = api;