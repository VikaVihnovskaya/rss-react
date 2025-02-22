import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ItemDetails {
  name: string;
  gender: string;
  height: string;
  mass: string;
  hairColor: string;
}

export const itemDetailsSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }), // Your base URL here
  endpoints: (builder) => ({
    getItemDetails: builder.query<ItemDetails, string>({
      query: (url) => url,
    }),
  }),
});

export const { useGetItemDetailsQuery } = itemDetailsSlice;
