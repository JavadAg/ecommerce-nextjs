import { createContext, useReducer, useContext, useEffect } from "react"
import shopReducer, { initialState } from "./reducer"

const ShopContext = createContext(initialState)

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    shopReducer,
    initialState,
    () => {
      const localData =
        typeof window !== "undefined" && localStorage.getItem("cart")
      return localData ? JSON.parse(localData) : initialState
    },
    []
  )

  //add new item to cart
  const addToCart = (product) => {
    const { data, selectedQuantity, selectedSize } = product

    const itemExist = state.products.find(
      (item) =>
        item.product.data.id === data.id &&
        item.product.selectedSize == selectedSize
    )
    if (itemExist) {
      itemExist.product.selectedQuantity += selectedQuantity
    } else {
      state.products.push({
        product
      })
    }

    const updatedCart = state.products
    dispatch({ type: "ADD_TO_CART", payload: { products: updatedCart } })
  }
  //increment item quantity
  const increment = ({ product }) => {
    const selectedProduct = state.products.find(
      (item) =>
        item.product.data.id === product.data.id &&
        item.product.selectedSize === product.selectedSize
    )

    selectedProduct.product.selectedQuantity++

    const updatedCart = state.products
    dispatch({ type: "INCREMENT_CART", payload: { products: updatedCart } })
  }
  //decrement item quantity
  const decrement = ({ product }) => {
    const selectedProduct = state.products.find(
      (item) =>
        item.product.data.id === product.data.id &&
        item.product.selectedSize === product.selectedSize
    )
    if (selectedProduct.product.selectedQuantity === 1) {
      const index = state.products.findIndex(
        (item) => item.product.data.id === product.data.id
      )
      state.products.splice(index, 1)
    } else {
      selectedProduct.product.selectedQuantity--
    }

    const updatedCart = state.products
    dispatch({ type: "INCREMENT_CART", payload: { products: updatedCart } })
  }
  //remove from cart
  const removeItem = ({ product }) => {
    const index = state.products.findIndex(
      (item) => item.product.data.id === product.data.id
    )
    state.products.splice(index, 1)

    const updatedCart = state.products
    dispatch({ type: "REMOVE_CART", payload: { products: updatedCart } })
  }
  //remove all
  const clearAll = () => {
    state.products = []

    const updatedCart = state.products
    dispatch({ type: "CLEAR_ALL", payload: { products: updatedCart } })
  }

  const value = {
    products: state.products,
    addToCart,
    increment,
    decrement,
    removeItem,
    clearAll
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

const useShop = () => {
  const context = useContext(ShopContext)
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider")
  }
  return context
}
export default useShop
