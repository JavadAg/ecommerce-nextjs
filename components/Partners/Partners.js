import React from "react"

const Partners = () => {
  return (
    <div className="py-10 px-4 md:px-10 lg:px-24 xl:px-36">
      <div className="flex justify-evenly items-center space-x-4 px-2 py-2 bg-white rounded-2xl ">
        <div className="object-contain w-16 lg:w-28">
          <img src="/./Adidas_Logo.svg" />
        </div>
        <div className="object-contain w-16 lg:w-28">
          <img src="/./Puma_logo.svg" />
        </div>
        <div className="object-contain w-16 lg:w-28">
          <img src="/./Gucci.svg" />
        </div>
        <div className="object-contain w-16 lg:w-28">
          <img src="/./Logo_NIKE.svg" />
        </div>
        <div className="object-contain w-16 lg:w-28">
          <img src="/./Converse_logo.svg" />
        </div>
      </div>
    </div>
  )
}

export default Partners
