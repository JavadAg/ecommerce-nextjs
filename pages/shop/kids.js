import React from "react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Products from "../../components/Products/Products"

const kids = ({ appProps }) => {
  const { products, userWishlist } = appProps
  const kidsShoes = products.filter((item) => item.category === "kids")
  return (
    <div>
      <Breadcrumb />
      <Products data={kidsShoes} userWishlist={userWishlist} />
    </div>
  )
}

export default kids
