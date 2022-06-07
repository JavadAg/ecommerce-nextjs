const setLocalStorage = (currentState) => {
  localStorage.setItem("cart", JSON.stringify(currentState))
  return currentState
}

export const initialState = {
  products: []
}

const shopReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "ADD_TO_CART":
      return setLocalStorage({
        ...state,
        products: payload.products
      })
    case "INCREMENT_CART":
      return setLocalStorage({
        ...state,
        products: payload.products
      })
    case "DECREMENT_CART":
      return setLocalStorage({
        ...state,
        products: payload.products
      })
    case "REMOVE_CART":
      return setLocalStorage({
        ...state,
        products: payload.products
      })
    case "CLEAR_ALL":
      return setLocalStorage({
        ...state,
        products: payload.products
      })
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

export default shopReducer
