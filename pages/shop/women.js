import React from "react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Products from "../../components/Products/Products"

const women = ({ appProps }) => {
  const womenShoes = appProps.filter((item) => item.type === "women")

  return (
    <div>
      <Breadcrumb />
      <Products data={womenShoes} />
    </div>
  )
}

export default women
