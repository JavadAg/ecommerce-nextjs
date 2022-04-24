import React from "react"
{
  /* dont mind the name */
}
const Policy = () => {
  return (
    <div>
      <div className="flex justify-between items-center bg-red-400 mt-10 mb-10 p-1 ">
        <div className="flex flex-col justify-center items-center w-full ">
          <img
            className="w-6 h-6 lg:w-16 lg:h-16"
            src="/./delivery-truck.png"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-sm lg:text-xl">Free Delivery</p>
            <p></p>
          </div>
        </div>
        <div className="flex flex-col  justify-center items-center w-full">
          <img
            className="w-6 h-6  lg:w-16 lg:h-16"
            src="/./product-return.png"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-sm lg:text-xl ">Return Policy</p>
            <p></p>
          </div>
        </div>
        <div className="flex flex-col  justify-center items-center w-full ">
          <img className="w-6 h-6  lg:w-16 lg:h-16" src="/./exclusive.png" />
          <div className="flex flex-col">
            <p className="font-semibold text-sm lg:text-xl ">Quality Product</p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Policy
