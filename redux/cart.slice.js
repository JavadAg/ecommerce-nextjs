import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemExist = state.find((item) => item.id === action.payload.id)
      if (itemExist) {
        itemExist.qty++
      } else {
        state.push({ ...action.payload, qty: 1 })
      }
    },
    incrementQty: (state, action) => {
      const item = state.find((item) => item.id === action.payload)
      item.qty++
    },
    decrementQty: (state, action) => {
      const item = state.find((item) => item.id === action.payload)
      if (item.qty === 1) {
        const index = state.findIndex((item) => item.id === action.payload)
        state.splice(index, 1)
      } else {
        item.qty--
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload)
      state.splice(index, 1)
    }
  }
})

export default cartSlice

export const { addToCart, incrementQty, decrementQty, removeFromCart } =
  cartSlice.actions
