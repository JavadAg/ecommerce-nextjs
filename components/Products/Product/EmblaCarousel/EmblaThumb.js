import React from "react"
import Image from "next/image"

export const Thumb = ({ selected, onClick, imgSrc }) => (
  <div className={`relative min-w-[20%] bg-white  overflow-hidden px-1 `}>
    <button
      onClick={onClick}
      className="relative overflow-hidden h-20 touch-manipulation cursor-pointer w-full bg-transparent block"
      type="button"
    >
      <Image
        className={`opacity-40 object-cover overflow-hidden ${
          selected ? "opacity-100" : ""
        }`}
        src={imgSrc}
        layout="responsive"
        width="0"
        height="0"
        alt="A cool shoe."
      />
    </button>
  </div>
)
