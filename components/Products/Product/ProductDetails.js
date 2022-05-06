import React, { useState } from "react"
import EmblaCarousel from "./EmblaCarousel/EmblaCarousel"
import { BsStar, BsStarFill } from "react-icons/bs"
import { HiX } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { addToCart } from "../../../redux/cart.slice"

const ProductDetails = ({ data }) => {
  const { id, brand, img, name, price, sizes, sold, type, discountedPrice } =
    data

  const dispatch = useDispatch()

  const [selectedSize, setSelectedSize] = useState(sizes[0])
  const [quantity, setQuantity] = useState(0)

  const handleCart = () => {
    dispatch(addToCart({ data, quantity, selectedSize }))
  }

  const SLIDE_COUNT = img.length
  const slides = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className="flex justify-center items-center">
      <div className="w-full flex-col flex justify-around items-center">
        <EmblaCarousel slides={slides} img={img} />
        <div className="flex justify-center items-center flex-col space-y-4">
          <span>{name}</span>
          <span>{brand}</span>
          <div className="space-x-1 flex items-center justify-center">
            <span
              className={`text-sm font-medium my-1 text-slate-700 space-x-1 lg:text-base ${
                discountedPrice && "line-through"
              }`}
            >
              {price}$
            </span>
            {discountedPrice && (
              <span className="text-md font-medium my-1 text-slate-700 space-x-1 lg:text-base">
                {discountedPrice}$
              </span>
            )}
          </div>
          <span>{type}</span>
          <div className="flex justify-center items-center space-x-2">
            <i>
              <BsStarFill />
            </i>
            <i>
              <BsStarFill />
            </i>
            <i>
              <BsStarFill />
            </i>
            <i>
              <BsStarFill />
            </i>
            <i>
              <BsStar />
            </i>
            <span>(142)</span>
          </div>
          <p className="text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            volutpat congue ante, vitae pulvinar arcu ullamcorper sit amet.
          </p>
          {
            <div className="flex justify-center items-center space-x-2">
              <span>Sizes:</span>
              <div className="flex justify-center items-center space-x-2">
                {sizes.map((obj, index) => (
                  <div key={index}>
                    <button
                      onClick={(e) => setSelectedSize(obj)}
                      disabled={obj.quantity == 0 ? true : false}
                      className={`bg-gray-100 w-8 h-8 rounded-xl focus:bg-gray-300 text-center disabled:opacity-40   ${
                        selectedSize === obj && "bg-gray-300"
                      } `}
                    >
                      {obj.size}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          }
          <div className="flex justify-center items-center">
            <button
              disabled={quantity == selectedSize?.quantity ? true : false}
              className="w-6 h-7 bg-gray-100 text-slate-700  font-semibold rounded-l-full pl-1  border-2 border-gray-300 border-r-0 disabled:text-opacity-10"
              onClick={() => setQuantity((prevValue) => prevValue + 1)}
            >
              +
            </button>

            <span className="flex bg-gray-100 items-center text-center px-1 border-t-2 border-b-2 border-gray-300">
              {quantity}
            </span>
            <button
              disabled={quantity == 0 ? true : false}
              className="w-6 h-7 bg-gray-100 text-slate-700  font-semibold rounded-r-full pr-1  border-2 border-gray-300 border-l-0 disabled:text-opacity-10"
              onClick={() => setQuantity((prevValue) => prevValue - 1)}
            >
              -
            </button>
            <button
              onClick={() => handleCart()}
              className="px-2 py-1 ml-2 bg-gray-100 rounded-xl text-sm font-medium"
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
