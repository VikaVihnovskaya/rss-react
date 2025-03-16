import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountryState {
  list: string[];
}

const initialState: CountryState = {
  list: [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'India',
  ],
};

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
