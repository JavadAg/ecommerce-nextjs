import React, { useState, useEffect } from "react"
import Image from "next/image"
import { HiHeart } from "react-icons/hi"

const ProductTab = ({ data }) => {
  const tabs = [
    {
      name: "Featured",
      item: data
    },
    {
      name: "New Arrivals",
      item: data.filter((item) => item.tag === "New")
    },
    { name: "Best Sell", item: data.filter((item) => item.sold >= 10) }
  ]

  const [selected, setSelected] = useState(tabs[1])

  const handleSelect = (tab) => {
    setSelected(tab)
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <div
          before="Products"
          className="relative flex justify-center items-center gap-2 after:content-[attr(before)] after:opacity-5 after:absolute after:font-black after:tracking-widest after:text-4xl after:-z-0 "
        >
          {tabs.map((tab) => (
            <p
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
            </p>
          ))}
        </div>
        <div className=" py-6 px-4 md:px-10 lg:px-24 w-full xl:px-36">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4   gap-y-10 gap-x-4">
            {selected.item.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className=" relative bg-[#F8F8F8] rounded-2xl hover:ring-2 ring-indigo-400 ring-opacity-50 ring-offset-4 transition-all ease-in-out duration-500 shadow-sm"
              >
                <div className="p-2">
                  {item.tag == "New" && (
                    <div className="absolute bg-red-400 w-10 h-5 rounded-2xl flex justify-center text-center items-center text-xs font-bold text-slate-100 lg:text-sm lg:w-14 lg:h-7">
                      {item.tag}
                    </div>
                  )}
                  <div className="absolute  right-2 w-10 h-5 rounded-2xl flex justify-center text-center items-center text-xl font-bold text-slate-200 active:text-red-500 z-10 lg:text-3xl">
                    <HiHeart />
                  </div>
                  <Image
                    className="object-center object-contain hover:rotate-12  transition-all ease-in-out duration-500 "
                    layout="responsive"
                    width="0"
                    height="0"
                    src={item.img[0]}
                    alt={item.title}
                  />
                </div>
                <div className="mt-4 flex justify-center items-center flex-col">
                  <p className="text-sm opacity-80 font-medium lg:font-bold lg:text-base">
                    {item.brand}
                  </p>
                  <p className="text-xs opacity-70  lg:text-sm">{item.title}</p>
                  <p className="text-sm font-bold  my-1 text-slate-700 lg:font-bold lg:text-base">
                    {item.price}$
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTab
