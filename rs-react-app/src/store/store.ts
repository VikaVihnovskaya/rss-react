import { configureStore } from '@reduxjs/toolkit';
import { itemDetailsSlice } from '../slices/itemDetailsSlice.ts';

const store = configureStore({
  reducer: {
    [itemDetailsSlice.reducerPath]: itemDetailsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemDetailsSlice.middleware),
});

export default store;
