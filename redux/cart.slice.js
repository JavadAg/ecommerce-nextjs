import { createSlice, current } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { data, quantity, selectedSize } = action.payload

      const itemExist = state.find(
        (item) => item.id === data.id && item.cart.size == selectedSize.size
      )

      if (itemExist) {
        itemExist.cart.qty = itemExist.cart.qty + quantity
      } else {
        state.push({
          ...data,
          cart: { size: selectedSize.size, qty: quantity },
          selectedSize: selectedSize
        })
      }
    },

    incrementQty: (state, action) => {
      const item = state.find(
        (item) =>
          item.id === action.payload.id &&
          item.cart.size === action.payload.cart.size
      )
      item.cart.qty++
    },

    decrementQty: (state, action) => {
      const item = state.find(
        (item) =>
          item.id === action.payload.id &&
          item.cart.size === action.payload.cart.size
      )
      if (item.cart.qty === 1) {
        const index = state.findIndex((item) => item.id === action.payload.id)
        state.splice(index, 1)
      } else {
        item.cart.qty--
      }
    },

    removeFromCart: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      state.splice(index, 1)
    }
  }
})

export default cartSlice

export const { addToCart, incrementQty, decrementQty, removeFromCart } =
  cartSlice.actions
