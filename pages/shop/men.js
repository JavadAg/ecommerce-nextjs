import React from "react"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import Products from "../../components/Products/Products"

const men = ({ appProps }) => {
  const menShoes = appProps.filter((item) => item.category === "men")
  return (
    <div>
      <Breadcrumb />
      <Products data={menShoes} />
    </div>
  )
}

export default men
