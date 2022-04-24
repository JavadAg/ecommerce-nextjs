import Image from "next/image"
import {
  incrementQty,
  decrementQty,
  removeFromCart
} from "../../redux/cart.slice"
import { useSelector, useDispatch } from "react-redux"
import { HiX } from "react-icons/hi"

const CartPage = () => {
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const getTotalPrice = () => {
    return cart.reduce((accumulator, item) => {
      return accumulator + item.qty * item.price.split(" ")
    }, 0)
  }

  return (
    <div className="flex flex-col justify-center items-center w-full py-24 md:px-10">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="font-bold pb-6">Shopping Cart</h1>
        <div className="flex w-full px-4 flex-col divide-y-2 divide-gray-200">
          {cart.length === 0 ? (
            <h1 className="flex justify-center items-center font-bold text-xl">
              Your Cart is Empty!
            </h1>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4">
                <div className="flex justify-between items-center ">
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm pb-2">{item.brand}</p>
                  </div>
                  <div>{item.price * item.qty}</div>
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div className="w-36 rounded-2xl">
                    <Image
                      className="aspect-video object-contain bg-gray-50 rounded-2xl"
                      layout="responsive"
                      src={item.img[0]}
                      alt={item.name}
                      height="0"
                      width="0"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p>For: {item.type}</p>

                    <div className="flex">
                      <button
                        className="w-6 h-7 bg-gray-100 text-slate-700  font-semibold rounded-l-full pl-1  border-2 border-gray-300 border-r-0 "
                        onClick={() => dispatch(incrementQty(item.id))}
                      >
                        +
                      </button>
                      <p className="flex items-center text-center px-1 border-t-2 border-b-2 border-gray-300">
                        {item.qty}
                      </p>
                      <button
                        className="w-6 h-7 bg-gray-100 text-slate-700 font-semibold rounded-r-full pr-1  border-2 border-gray-300 border-l-0 "
                        onClick={() => dispatch(decrementQty(item.id))}
                      >
                        -
                      </button>
                      <button
                        className="w-6 h-7 bg-gray-300 rounded-lg text-slate-700  font-semibold mx-1"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <i className="flex items-center  justify-center text-sm">
                          <HiX />
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {cart.length > 0 && (
        <div className="flex flex-col justify-center items-center font-extrabold bg-white w-11/12 rounded-2xl p-2">
          <h2>Grand Total: $ {getTotalPrice()}</h2>
        </div>
      )}
    </div>
  )
}

export default CartPage
