import React from "react"
import Image from "next/image"

export const Thumb = ({ selected, index, onClick, imgSrc }) => (
  <div className={`relative min-w-[20%] bg-white  overflow-hidden px-1`}>
    <button
      onClick={onClick}
      className="relative overflow-hidden h-20 touch-manipulation cursor-pointer w-full bg-transparent block"
      type="button"
    >
      <Image
        className={`object-contain overflow-hidden duration-200  ${
          selected ? "opacity-100" : "opacity-40 "
        } `}
        src={imgSrc}
        layout="fill"
        alt="A cool shoe."
      />
    </button>
  </div>
)
