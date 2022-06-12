import React, { useState, useEffect } from "react"
import Product from "../Product/Product"

//filter products based on selection in tabs
const ProductTab = ({ products }) => {
  const tabs = [
    {
      name: "Price Drops",
      item: products?.filter((item) => item?.discountprice > 0)
    },
    {
      name: "New Arrivals",
      item: products
    },
    { name: "Best Sell", item: products?.filter((item) => item.sold >= 10) }
  ]
  const [postNum, setPostNum] = useState(4)
  const [selected, setSelected] = useState(tabs[1])

  const handleSelect = (tab) => {
    setSelected(tab)
  }

  //handle load more posts button
  const handleLoad = () => {
    setPostNum((prevPostNum) => prevPostNum + 4)
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <div
          before="Products"
          className="relative flex justify-center items-center gap-2 after:content-[attr(before)] after:opacity-5 after:absolute after:font-black after:tracking-widest after:text-4xl after:-z-0 "
        >
          {tabs.map((tab) => (
            <span
              key={tab.name}
              name={tab.name}
              onClick={() => {
                handleSelect(tab)
              }}
              className={`text-sm z-10 font-bold transition-all ease-in-out duration-500 lg:text-base ${
                selected.name === tab.name ? "text-red-600" : "text-slate-700"
              } cursor-pointer `}
            >
              {tab.name}
            </span>
          ))}
        </div>
        <div className="py-6 px-4 md:px-24 lg:px-28 w-full xl:px-36 2xl:px-56">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-4">
            {selected.item?.slice(0, postNum).map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>
          <div className="flex justify-center items-center w-full mt-6">
            {postNum <= products.length && (
              <button
                onClick={handleLoad}
                href="#_"
                className="relative rounded-2xl px-2 py-1 overflow-hidden group bg-red-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300 md:px-3"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative text-xs flex justify-center items-center md:text-sm">
                  Load more ...
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTab
