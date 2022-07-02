import React from "react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Products from "../../components/Products/Products"

const ShopPage = ({ appProps }) => {
  const { products, userWishlist } = appProps
  return (
    <div>
      <Breadcrumb />
      <Products data={products} userWishlist={userWishlist} />
    </div>
  )
}

export default ShopPage
