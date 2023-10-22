import { ProductState } from "./ProductStore";
/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartStore {
  totalCount: number;
  totalPrice: number;
  products: ProductState[];
}
const initialState: CartStore = {
  totalCount: 0,
  totalPrice: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddToCart: (state, action: PayloadAction<ProductState>) => {
      const newItem = action.payload;
      const existingItem = state.products.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.cartCount++;
      } else {
        state.products.push({ ...newItem, cartCount: 1 });
      }
      state.totalCount++;
      state.totalPrice += parseFloat(newItem.price)
    },
    RemoveCartItem: (state, action: PayloadAction<ProductState>) => {
      const item = action.payload;
      const existingItem = state.products.find(e => e.id === item.id);

      if (existingItem) {
        if (existingItem.cartCount === 1) {
          state.products = state.products.filter(e => e.id !== item.id);
        } else {
          existingItem.cartCount--;
        }
        state.totalCount--;
        state.totalPrice -= parseFloat(existingItem.price)
      }
    },
  },
});

export const { AddToCart, RemoveCartItem } = cartSlice.actions;

export default cartSlice.reducer;
