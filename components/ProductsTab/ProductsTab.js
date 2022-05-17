import React, { useState, useEffect } from "react"
import Image from "next/image"
import { HiHeart } from "react-icons/hi"
import { useRouter } from "next/router"

const ProductTab = ({ data }) => {
  const router = useRouter()
  console.log(data)
  const tabs = [
    {
      name: "Price Drops",
      item: data?.filter((item) => item?.discountedPrice > 0)
    },
    {
      name: "New Arrivals",
      item: data
    },
    { name: "Best Sell", item: data?.filter((item) => item.sold >= 10) }
  ]
  const [postNum, setPostNum] = useState(4)
  const [selected, setSelected] = useState(tabs[1])
  const [discountedExist, setDiscountedExist] = useState(false)

  const handleSelect = (tab) => {
    setSelected(tab)
  }

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
              className={`text-sm z-10 font-bold text-slate-700 transition-colors ease-in-out duration-500 lg:text-lg ${
                selected.name === tab.name && "text-red-800"
              } cursor-pointer `}
            >
              {tab.name}
            </span>
          ))}
        </div>
        <div className="py-6 px-4 md:px-10 lg:px-24 w-full xl:px-36">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4   gap-y-4 gap-x-4">
            {selected.item?.slice(0, postNum).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  router.push(`/shop/${item.id}`)
                }}
                className=" relative bg-white rounded-2xl hover:ring-2 ring-red-300 ring-opacity-50 ring-offset-4 transition-all ease-in-out duration-500 shadow-sm"
              >
                <div className="p-2">
                  {/* {item.tag == "New" && (
                    <div className="absolute bg-red-400 w-10 h-5 rounded-2xl flex justify-center text-center items-center text-xs font-bold text-slate-100 lg:text-sm lg:w-14 lg:h-7">
                      {item.tag}
                    </div>
                  )} */}
                  <div className="absolute right-2 top-2 rounded-2xl flex justify-center text-center items-center text-xl font-bold text-slate-200 active:text-red-500 z-10 lg:text-3xl">
                    <HiHeart />
                  </div>
                  <Image
                    className="object-contain hover:rotate-12 transition-all ease-in-out duration-500"
                    layout="responsive"
                    width="0"
                    height="0"
                    src={item.img[0]}
                    alt={item.name}
                  />
                </div>
                <div className="mt-4 flex justify-center items-center flex-col space-y-1">
                  <span className="text-sm p-1 rounded-2xl text-gray-500 font-semibold">
                    {item.name}
                  </span>
                  <span className="text-xs text-red-700 font-medium ">
                    {item.brand}
                  </span>

                  <div className="space-x-1 flex items-center justify-center">
                    <span
                      className={`text-sm font-semibold bg-red-400 px-2 rounded-2xl  my-1 text-gray-100 space-x-1 lg:text-base ${
                        item.discountedPrice && "line-through bg-gray-500"
                      }`}
                    >
                      {item.price}$
                    </span>
                    {item.discountedPrice && (
                      <span className="text-sm font-semibold my-1 space-x-1 lg:text-base bg-red-400 px-2 rounded-2xl text-gray-100">
                        {item.discountedPrice}$
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center w-full mt-6">
            {postNum <= data.length && (
              <button
                className="bg-gray-50 px-3 border border-gray-500/20 py-1 rounded-xl font-medium text-sm hover:bg-slate-200  transition-colors duration-100 ease-linear"
                onClick={handleLoad}
              >
                Load more ...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTab
