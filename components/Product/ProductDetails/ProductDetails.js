import React, { useState } from "react"
import EmblaCarousel from "./EmblaCarousel/EmblaCarousel"
import useShop from "../../../utils/cartcontext"

const ProductDetails = ({ data }) => {
  const { brand, img, name, price, sizes, category, discountprice } = data
  const { products, addToCart } = useShop()
  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [selectedQuantity, setSelectedQuantity] = useState(0)

  const handleCart = () => {
    addToCart({ data, selectedQuantity, selectedSize })
  }

  const SLIDE_COUNT = img.length
  const slides = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className="flex justify-center items-center md:mx-8 lg:mx-24 xl:mx-48">
      <div className="w-full mx-2 my-2 flex-col flex justify-around items-center md:flex-row md:justify-evenly md:items-center md:space-x-5">
        <EmblaCarousel slides={slides} img={img} />
        <div className="flex justify-center items-center flex-col space-y-4 w-full">
          <span className="text-lg rounded-2xl font-bold mt-4 text-gray-50 bg-red-400 w-full text-center md:mt-0 md:bg-transparent md:text-gray-700 xl:text-2xl">
            {name}
          </span>
          <span className="text-md rounded-2xl  font-bold bg-white dark:bg-zinc-800 text-red-400/80 dark:text-red-300 w-full text-center md:bg-transparent xl:text-2xl">
            {brand}
          </span>
          <div className="space-x-1 flex items-center justify-center ">
            <span
              className={`font-bold my-1 text-slate-700 dark:text-zinc-200 space-x-1 lg:text-3xl xl:text-3xl ${
                discountprice > 0 ? "line-through text-md " : "text-2xl"
              }`}
            >
              {price}$
            </span>
            {discountprice > 0 && (
              <span className=" font-bold text-2xl my-1 text-slate-700 dark:text-zinc-300 space-x-1 lg:text-3xl xl:text-3xl">
                {discountprice}$
              </span>
            )}
          </div>
          <span className="text-md font-medium lg:text-xl xl:text-xl">
            For : {category}
          </span>
          {
            <div className="flex justify-center items-center space-x-2">
              <span>Sizes:</span>
              <div className="flex justify-center items-center space-x-2">
                {sizes.map((size, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setSelectedSize(size)}
                      disabled={size.quantity == 0 ? true : false}
                      className={`bg-gray-100 dark:bg-zinc-700 duration-300 w-8 h-8 rounded-xl focus:bg-gray-200 dark:focus:bg-zinc-800 text-center disabled:opacity-40 dark:text-zinc-300  ${
                        selectedSize === size && "bg-gray-200 dark:bg-zinc-800"
                      } `}
                    >
                      {size.size}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          }
          <div className="flex justify-between items-center">
            <button
              disabled={
                selectedQuantity == selectedSize?.quantity ? true : false
              }
              className="w-10 h-7 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300  font-semibold rounded-l-lg pl-1 border border-gray-200 dark:border-zinc-700 border-r-0 disabled:text-opacity-10"
              onClick={() => setSelectedQuantity((prevValue) => prevValue + 1)}
            >
              +
            </button>

            <span className="h-7 flex bg-white dark:bg-zinc-800 items-center text-center px-1 border-t border-b border-gray-200 dark:border-zinc-700">
              {selectedQuantity}
            </span>
            <button
              disabled={selectedQuantity == 0 ? true : false}
              className="w-10 h-7 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold rounded-r-lg pr-1 border border-gray-200 dark:border-zinc-700 border-l-0"
              onClick={() => setSelectedQuantity((prevValue) => prevValue - 1)}
            >
              -
            </button>
            <button
              disabled={selectedQuantity == 0 ? true : false}
              onClick={() => handleCart()}
              className={`px-2 py-1 ml-2 bg-red-400 text-gray-50  rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
