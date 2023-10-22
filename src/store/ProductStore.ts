import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  createdAt: string,
  name: string,
  image: string,
  description: string,
  model: string,
  brand: string,
  isFavorite: boolean,
  price: string,
  cartCount: number,
  id: number,
}

const initialState: ProductState[] = []

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    SetProducts: (state, action: PayloadAction<ProductState[]>) => {
      state = action.payload

      return state
    },
    SetFavoriteToProductStore: (state, action: PayloadAction<ProductState>) => {
      const find = state.find(item => item.id === action.payload.id);

      if (find !== undefined) {
        const index = state.indexOf(find)

        if (find.isFavorite === true) {
          find.isFavorite = false
        } else {
          find.isFavorite = true
        }

        state[index] = find
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { SetProducts, SetFavoriteToProductStore } = productSlice.actions

export default productSlice.reducer

