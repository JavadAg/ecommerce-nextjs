import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"

const url = process.env.NEXT_PUBLIC_URL

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    get: builder.query({
      query: () => ({
        url: "/api/data",
        method: "GET"
      })
    })
  })
})

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: {}
  },
  reducers: {
    setProducts: (state = initialState, { payload }) => {
      state.products = payload
      console.log(state.products)
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.products = action.payload
    }
  }
})

export default productsSlice.reducer
export const { useGetQuery } = productsApi
export const { setProducts } = productsSlice.actions
