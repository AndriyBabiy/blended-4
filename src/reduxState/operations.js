import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from 'service/opencagedataApi';
import { exchangeCurrency } from 'service/exchangeAPI.js';

export const fetchBaseCurrency = createAsyncThunk(
  'currency/baseCurrency',

  async (coords, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }
    try {
      const data = await getUserInfo(coords);
      return data.results[0].annotations.currency.iso_code;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchChangeCurrency = createAsyncThunk(
  'currency/changeCurrency',
  async (exchangeData, thunkAPI) => {
    try {
      return await exchangeCurrency(exchangeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
