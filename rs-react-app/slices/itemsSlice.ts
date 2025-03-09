import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ItemDetails } from './itemDetailsSlice.ts';
import { Item } from '../app/components/ResultsList/ResultsList';

interface ItemsResponse {
  results: Item[];
}

export const itemSlice = createApi({
  reducerPath: 'item',
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

export const { useGetItemsQuery } = itemSlice;
