import Image from "next/image"
import { HiX } from "react-icons/hi"
import useShop from "../../utils/context"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { gql } from "graphql-request"
import { request } from "../../lib/graphcms"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"

const CartComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: session, status } = useSession()

  const success = (message) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      closeButton: false,
      draggable: true,
      progress: undefined
    })

  const { products, increment, decrement, removeItem, clearAll } = useShop()

  const getTotalPrice = () => {
    return products.reduce((accumulator, item) => {
      if (item.product.data.discountprice > 0) {
        return (
          accumulator +
          item.product.selectedQuantity * item.product.data.discountprice
        )
      } else {
        return (
          accumulator + item.product.selectedQuantity * item.product.data.price
        )
      }
    }, 0)
  }

  const addOrder = async () => {
    const order = products.map((item) => {
      return {
        productName: item.product.data.name,
        productImg: item.product.data.img[0].url,
        quantity: item.product.selectedQuantity
      }
    })

    if (status !== "authenticated") {
      return notify("Please login first")
    } else {
      let mutate = gql`
        mutation MyMutation(
          $quantity: [Int!] = [${order.map((item) => item.quantity)}]
          $name: [String!] = [${order.map((item) =>
            JSON.stringify(item.productName)
          )}]
          $img: [String!] = [${order.map((item) =>
            JSON.stringify(item.productImg)
          )}]
        ) {
          createOrder(data: { name: $name, img: $img, quantity: $quantity }) {
            id
          }
        }
      `
      const { createOrder } = await request({
        query: mutate
      })

      let mutate1 = gql`
        mutation MyMutation {
          updateOrder(
            data: {
              cl42xpqn54pna01xs5gam49g7: { connect: { where: { id: "${session.user.id}" } } }
            } where: {id: "${createOrder.id}"}
          ) {
            name
          }
          publishOrder(where: { id: "${createOrder.id}" }) {
            name
          }
        }
      `
      await request({
        query: mutate1
      })
    }
    success("Purchased Successfully")

    clearAll()
  }

  const handleCheckout = async () => {
    setIsSubmitting(true)
    await addOrder()
    setIsSubmitting(false)
  }
 
  return (
    <div className="flex flex-col justify-center items-center w-full py-24 md:px-10 lg:flex-row lg:items-start">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="font-bold pb-6 text-gray-700">Shopping Cart</h1>
        <div className="flex w-full px-4 flex-col space-y-2">
          {products.length === 0 ? (
            <h1 className="flex justify-center items-center font-bold text-xl">
              Your Cart is Empty!
            </h1>
          ) : (
            products.map((item, index) => (
              <div
                key={index}
                className="py-4 bg-white rounded-2xl px-2 border border-gray-300/50 sm:px-10 lg:flex lg:justify-center lg:items-center lg:flex-row-reverse lg:py-0"
              >
                <div className="flex justify-between items-center lg:space-x-10">
                  <div className="flex flex-col">
                    <span className="font-bold">{item.product.data.name}</span>
                    <span className="text-sm font-bold text-red-400 pb-2">
                      {item.product.data.brand}
                    </span>
                  </div>
                  <span className="font-bold">
                    <span>Price : </span>

                    <span className="text-red-500">
                      {item.product.data.discountprice > 0
                        ? item.product.data.discountprice
                        : item.product.data.price *
                          item.product.selectedQuantity}
                      $
                    </span>
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-between lg:justify-start lg:space-x-10">
                  <div className="w-36 rounded-2xl">
                    <Image
                      className="aspect-video object-contain bg-[#ffffff] rounded-2xl"
                      layout="responsive"
                      src={item.product.data.img[0].url}
                      alt={item.product.data.name}
                      height="0"
                      width="0"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-end space-y-2 sm:flex-row sm:justify-between w-7/12">
                    <span className="font-bold">
                      Size: {item.product.selectedSize.size}
                    </span>
                    <span className="sm:font-bold">
                      For: {item.product.data.category}
                    </span>
                    <div className="flex justify-center items-center">
                      <button
                        disabled={
                          item.product.selectedQuantity ==
                          item.product.selectedSize?.quantity
                            ? true
                            : false
                        }
                        className="w-10 h-7 bg-white text-slate-700  font-semibold rounded-l-lg pl-1  border border-gray-200 border-r-0 disabled:text-opacity-10"
                        onClick={() => {
                          increment(item)
                        }}
                      >
                        +
                      </button>
                      <span className="h-7 flex bg-white items-center text-center px-1 border-t border-b border-gray-200">
                        {item.product.selectedQuantity}
                      </span>
                      <button
                        className="w-10 h-7 bg-white text-slate-700 font-semibold rounded-r-lg pr-1 border border-gray-200 border-l-0"
                        onClick={() => {
                          decrement(item)
                        }}
                      >
                        -
                      </button>
                      <button
                        className="w-6 h-6 bg-white ring-1 ring-red-200 rounded-lg text-slate-700 font-semibold mx-1 ml-5"
                        onClick={() => {
                          removeItem(item)
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
      {products?.length > 0 && (
        <div className="flex justify-center items-center flex-col w-full space-y-5 mt-5 lg:flex lg:justify-center lg:items-center lg:w-5/12 lg:bg-white lg:h-screen lg:relative lg:rounded-2xl lg:border lg:border-gray-300/50 lg:mt-12">
          <div className="flex flex-col justify-center items-center font-extrabold bg-white w-11/12 rounded-2xl p-2 lg:bg-gray-100 ">
            <h2>Grand Total: $ {getTotalPrice()}</h2>
          </div>
          <div
            onClick={handleCheckout}
            className="flex flex-col justify-center items-center font-extrabold bg-red-400 w-11/12 rounded-2xl p-2 mt-2 "
          >
            <button
              disabled={isSubmitting === true}
              className="font-bold text-white disabled:text-opacity-20 disabled:cursor-wait"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default CartComponent
