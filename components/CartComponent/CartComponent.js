import Image from "next/image"
import {
  incrementQty,
  decrementQty,
  removeFromCart
} from "../../redux/cart.slice"
import { useSelector, useDispatch } from "react-redux"
import { HiX } from "react-icons/hi"

const CartComponent = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const getTotalPrice = () => {
    return cart.reduce((accumulator, item) => {
      return accumulator + item.cart.qty * item.price
    }, 0)
  }

  const handleincrement = (item) => {
    const { id, cart } = item
    console.log(item)
    dispatch(incrementQty({ id, cart }))
  }

  const handledecrement = (item) => {
    const { id, cart } = item
    dispatch(decrementQty({ id, cart }))
  }

  const handleremove = (item) => {
    const { id, cart } = item
    dispatch(removeFromCart({ id, cart }))
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
            cart.map((item, index) => (
              <div key={index} className="py-4">
                <div className="flex justify-between items-center ">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm pb-2">{item.brand}</p>
                  </div>
                  <div>Price: {item.price * item.cart.qty} $</div>
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
                  <div>Size: {item.cart.size}</div>
                  <div className="flex flex-col justify-center items-center space-y-2">
                    <p>For: {item.type}</p>

                    <div className="flex justify-center items-center">
                      <button
                        disabled={
                          item.cart.qty == item.selectedSize?.quantity
                            ? true
                            : false
                        }
                        className="w-6 h-7 bg-gray-100 text-slate-700  font-semibold rounded-l-full pl-1  border-2 border-gray-300 border-r-0 disabled:text-opacity-10"
                        onClick={() => {
                          handleincrement(item)
                        }}
                      >
                        +
                      </button>
                      <p className="flex items-center text-center px-1 border-t-2 border-b-2 border-gray-300">
                        {item.cart.qty}
                      </p>
                      <button
                        className="w-6 h-7 bg-gray-100 text-slate-700 font-semibold rounded-r-full pr-1  border-2 border-gray-300 border-l-0"
                        onClick={() => {
                          handledecrement(item)
                        }}
                      >
                        -
                      </button>
                      <button
                        className="w-6 h-6 bg-gray-300 rounded-lg text-slate-700  font-semibold mx-1"
                        onClick={() => {
                          handleremove(item)
                        }}
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
      {cart?.length > 0 && (
        <div className="flex flex-col justify-center items-center font-extrabold bg-white w-11/12 rounded-2xl p-2">
          <h2>Grand Total: $ {getTotalPrice()}</h2>
        </div>
      )}
    </div>
  )
}

export default CartComponent
