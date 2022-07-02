import React from "react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Products from "../../components/Products/Products"

const men = ({ appProps }) => {
  const { products, userWishlist } = appProps
  const menShoes = products.filter((item) => item.category === "men")
  return (
    <div>
      <Breadcrumb />
      <Products data={menShoes} userWishlist={userWishlist} />
    </div>
  )
}

export default men
