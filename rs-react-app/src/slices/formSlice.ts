import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  // picture: string; // base64 format
  // country: string;
}

interface FormState {
  entries: FormData[];
}

const initialState: FormState = {
  entries: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.entries.push(action.payload);
    },
  },
});

export const { addFormData } = formSlice.actions;
export default formSlice.reducer;
