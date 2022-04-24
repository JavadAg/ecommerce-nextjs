import React from "react"
import Hero from "../components/Hero/Hero"
import Categories from "../components/Categories/Categories"
import ProductsTab from "../components/ProductsTab/ProductsTab"
import Partners from "../components/Partners/Partners"
import Policy from "../components/PolicyComponent/Policy"
import FromtheBlog from "../components/FromtheBlogComponent/FromtheBlog"

export default function Home({ appProps }) {
  return (
    <>
      <div className="bg-gray-100">
        <Hero />
        <ProductsTab data={appProps} />
        <Categories data={appProps} />
        <Policy />
        <FromtheBlog />
        <Partners />
      </div>
    </>
  )
}
