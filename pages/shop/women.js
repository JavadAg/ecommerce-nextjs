import React from "react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Products from "../../components/Products/Products"

const women = ({ appProps }) => {
  const { products, userWishlist } = appProps
  const womenShoes = products.filter((item) => item.category === "women")

  return (
    <div>
      <Breadcrumb />
      <Products data={womenShoes} userWishlist={userWishlist} />
    </div>
  )
}

export default women
