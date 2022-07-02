import React from "react"
import Img from "next/image"

const Orders = ({ orders }) => {
  console.log(orders)
  return (
    <div className="flex justify-center items-start flex-col w-11/12 bg-white dark:bg-zinc-800 my-4 border border-gray-300 dark:border-zinc-700 rounded-2xl shadow-sm divide-y text-sm sm:w-7/12 sm:my-0 sm:font-bold sm:p-4 sm:space-y-2">
      {orders.map((order, index) => (
        <div
          key={index}
          className="py-2 w-full items-center flex justify-center flex-col"
        >
          <span className="font-bold text-gray-600 dark:text-zinc-300">
            Created At : {order.createdAt}
          </span>
          <div className="p-2 w-full items-center flex justify-between">
            <div className="flex flex-col justify-center items-start space-y-12">
              {order.name.map((n, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center w-30 overflow-hidden sm:space-x-1 "
                >
                  <span className="text-gray-700 dark:text-zinc-300">
                    Name:
                  </span>
                  <span className="text-red-400 rounded-md bg-gray-50 dark:bg-zinc-700">
                    {n}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center items-start space-y-12">
              {order.quantity.map((q, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center sm:space-x-1"
                >
                  <span className="text-gray-700 dark:text-zinc-300">
                    Quantity:
                  </span>
                  <span className="text-red-400 rounded-md bg-gray-50 dark:bg-zinc-700">
                    {q}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-16">
              {order.img.map((i, index) => (
                <Img
                  key={index}
                  className="text-red-400 bg-white  rounded-md object-contain"
                  src={i}
                  alt="orderImg"
                  width="0"
                  height="0"
                  layout="responsive"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Orders
