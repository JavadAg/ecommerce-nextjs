import React from "react"
import EmblaCarousel from "./EmblaCarouselBlog/Embla"

const SLIDE_COUNT = 3
const slides = Array.from(Array(SLIDE_COUNT).keys())

const FromtheBlog = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10 px-4 mb-4 ">
        <div
          before="Blog"
          className="relative flex justify-center items-center text-center gap-2 after:content-[attr(before)] after:opacity-5 after:absolute after:font-black after:tracking-widest after:text-4xl lg:text-lg"
        >
          <p
            className={`text-sm font-bold text-slate-700 transition-colors ease-in-out duration-500 leading-10 lg:text-lg`}
          >
            From the Blog
          </p>
        </div>
      </div>
      <EmblaCarousel slides={slides} />
    </div>
  )
}

export default FromtheBlog
