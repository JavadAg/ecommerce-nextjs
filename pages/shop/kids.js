import React from "react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Products from "../../components/Products/Products"

const kids = ({ appProps }) => {
  const kidsShoes = appProps.filter((item) => item.type === "kids")
  return (
    <div>
      <Breadcrumb />
      <Products data={kidsShoes} />
    </div>
  )
}

export default kids
