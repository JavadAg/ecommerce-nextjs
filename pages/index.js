import React from "react"
import Hero from "../components/Hero/Hero"
import Categories from "../components/Categories/Categories"
import ProductsTab from "../components/ProductsTab/ProductsTab"
import Partners from "../components/Partners/Partners"
import FromtheBlog from "../components/FromtheBlog/FromtheBlog"

export default function Home({ appProps }) {
  return (
    <>
      <div>
        <Hero />
        <ProductsTab data={appProps} />
        <Categories data={appProps} />
        <FromtheBlog />
        <Partners />
      </div>
    </>
  )
}
