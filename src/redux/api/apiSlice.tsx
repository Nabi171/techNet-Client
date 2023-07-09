import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//route for api fetch from backend application
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    singleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useSingleProductQuery } = api;