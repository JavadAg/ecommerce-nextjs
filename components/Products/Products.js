import React from "react"
import Product from "../Product/Product"

const Products = ({ data }) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center ">
        <div className="py-4 px-2 md:px-10 w-full xl:px-36">
          <div className="grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-4 md:grid-cols-3 xl:grid-cols-4">
            {data?.map((item) => (
              <Product item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
