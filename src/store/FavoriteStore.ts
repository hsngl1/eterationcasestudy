/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from './ProductStore';

const initialState: ProductState[] = [];

const favoriteReducer = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    SetFavorite: (state, action: PayloadAction<ProductState>) => {
      const value = state.find(item => item.id === action.payload.id);

      if (value) {
        const index = state.indexOf(value);
        state.splice(index, 1);
      } else {
        state.push({ ...action.payload, isFavorite: true });
      }
    },
  },
});

export const { SetFavorite } = favoriteReducer.actions;

export default favoriteReducer.reducer;
