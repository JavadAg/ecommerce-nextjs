import React from "react"
import Img from "next/image"
import { useRouter } from "next/router"

const Wishlist = ({ wishlist }) => {
  const router = useRouter()
  return (
    <div className="flex justify-center items-start flex-col w-11/12 bg-white my-4 border border-gray-300 rounded-2xl shadow-sm divide-y text-sm sm:w-7/12 sm:my-0 sm:font-bold  sm:p-4 sm:space-y-2">
      {wishlist.map((product, index) => (
        <div
          key={index}
          onClick={() => {
            router.push(`/shop/${product.slug}`),
              undefined,
              {
                shallow: true
              }
          }}
          className="p-2 w-full items-center flex justify-between "
        >
          <div className="flex justify-center items-start flex-col space-y-1 ">
            <div className="flex justify-start items-center ">
              <span className="text-gray-700">Name :</span>
              <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50 ">
                {product.name}
              </span>
            </div>
            <div className="flex justify-start items-center">
              <span className="text-gray-700">Brand :</span>
              <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50">
                {product.brand}
              </span>
            </div>
          </div>
          <div className="w-16 ">
            <Img
              className="text-red-400 ml-2 bg-white px-2 rounded-md  object-contain"
              src={product.image.url}
              alt={product.slug}
              width="0"
              height="0"
              layout="responsive"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Wishlist
