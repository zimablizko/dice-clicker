import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SnackbarState {
  isOpen: boolean;
  message: string;
}

const initialState: SnackbarState = {
  isOpen: false,
  message: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<string>) => {
      console.log('showSnackbar');
      state.isOpen = true;
      state.message = action.payload;
    },
    hideSnackbar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
