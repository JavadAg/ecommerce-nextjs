import React from "react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Products from "../../components/Products/Products"

const ShopPage = ({ appProps }) => {
  return (
    <div>
      <Breadcrumb />
      <Products data={appProps} />
    </div>
  )
}

export default ShopPage
