import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  username: string;
  email: string;
  phoneNumber: string;
}

const initialState: FormState = {
  username: '',
  email: '',
  phoneNumber: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm(state, action: PayloadAction<Partial<FormState>>) {
      return { ...state, ...action.payload };
    },
    resetForm(state) {
      return initialState;
    },
  },
});

export const { updateForm, resetForm } = formSlice.actions;

export default formSlice.reducer;
