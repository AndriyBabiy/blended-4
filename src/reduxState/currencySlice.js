import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency, fetchChangeCurrency } from './operations';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = state => {
  state.isLoading = false;
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setBaseCurrency(state, action) {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, action) => {
        state.baseCurrency = action.payload;
      })
      .addCase(fetchChangeCurrency.fulfilled, (state, {payload}) => {
        state.exchangeInfo = payload;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), handlePending)
      .addMatcher((action) => action.type.endsWith('/rejected'), handleRejected)
      .addMatcher((action) => action.type.endsWith('/fulfilled'), handleFulfilled)
});

export const { setBaseCurrency } = currencySlice.actions;
export const currencySliceReducer = currencySlice.reducer;
