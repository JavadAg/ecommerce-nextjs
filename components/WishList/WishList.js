import React from "react"

const WishList = ({ data }) => {
  console.log(data)
  return (
    <div className="flex justify-center items-center text-center">
      <div className="flex justify-center items-center text-center mt-16">
        <span>{data.id}</span>
        <span>{data.name}</span>
      </div>
    </div>
  )
}

export default WishList
