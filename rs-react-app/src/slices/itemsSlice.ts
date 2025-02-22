import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Item {
  name: string;
  url: string;
}

interface ItemDetails {
  name: string;
  gender: string;
  height: string;
  mass: string;
  hairColor: string;
}

interface ItemsResponse {
  results: Item[];
}

export const itemSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getItems: builder.query<
      ItemsResponse,
      { searchTerm: string; page: number }
    >({
      query: ({ searchTerm, page }) =>
        searchTerm.trim()
          ? `people/?search=${encodeURIComponent(searchTerm)}`
          : `people/?page=${encodeURIComponent(page)}`,
    }),
    getItemDetails: builder.query<ItemDetails, string>({
      query: (url) => url,
    }),
  }),
});

export const { useGetItemsQuery, useGetItemDetailsQuery } = itemSlice;
