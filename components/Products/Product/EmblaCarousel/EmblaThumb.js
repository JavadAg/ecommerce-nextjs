import React from "react"
import Image from "next/image"

export const Thumb = ({ selected, onClick, imgSrc }) => (
  <div className={`pl-3 relative min-w-[20%] ${selected ? "opacity-100" : ""}`}>
    <button
      onClick={onClick}
      className="relative overflow-hidden h-20 touch-manipulation cursor-pointer w-full bg-transparent block"
      type="button"
    >
      <Image
        className={`opacity-40 object-cover ${selected ? "opacity-100" : ""}`}
        src={imgSrc}
        layout="fill"
        w="0"
        h="0"
        alt="A cool shoe."
      />
    </button>
  </div>
)
