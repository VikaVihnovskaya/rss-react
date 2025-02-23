import { configureStore } from '@reduxjs/toolkit';
import { itemDetailsSlice } from '../slices/itemDetailsSlice.ts';
import { itemSlice } from '../slices/itemsSlice.ts';

const store = configureStore({
  reducer: {
    [itemDetailsSlice.reducerPath]: itemDetailsSlice.reducer,
    [itemSlice.reducerPath]: itemSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      itemDetailsSlice.middleware,
      itemSlice.middleware
    ),
});

export type AppStore = ReturnType<typeof configureStore>;

export default store;
