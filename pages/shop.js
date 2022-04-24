import Image from "next/image"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../redux/cart.slice"

const ShopPage = ({ appProps }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  const handleCart = (item) => {
    dispatch(addToCart(item))
  }

  return (
    <>
      <div className="bg-gray-100 ">
        <div className="flex flex-col justify-center items-center ">
          <div className=" py-6 px-4 md:px-10 w-full mt-24 xl:px-36">
            <div className="grid grid-cols-2 grid-rows-2 gap-y-10 gap-x-4 md:grid-cols-3 xl:grid-cols-4">
              {appProps.map((item) => (
                <div
                  onClick={() => {
                    handleCart(item)
                  }}
                  key={item.id}
                  className=" relative bg-[#F8F8F8] rounded-2xl hover:ring-2 ring-indigo-400 ring-opacity-50 ring-offset-4 transition-all ease-in-out duration-500 shadow-sm"
                >
                  <div className="p-2">
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
                    <p className="text-sm opacity-80 font-medium ">
                      {item.brand}
                    </p>
                    <p className="text-xs opacity-70">{item.title}</p>
                    <p className="text-sm font-bold  my-1 text-slate-700">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShopPage
