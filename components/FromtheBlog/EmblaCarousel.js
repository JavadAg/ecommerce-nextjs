import React, { useState, useEffect, useCallback } from "react"
import { PrevButton, NextButton } from "./EmblaButtons"
import useEmblaCarousel from "embla-carousel-react"

const EmblaCarousel = ({ posts }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start"
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState([])

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
  const scrollTo = useCallback(
    (index) => embla && embla.scrollTo(index),
    [embla]
  )

  const onSelect = useCallback(() => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    setScrollSnaps(embla.scrollSnapList())
    embla.on("select", onSelect)
  }, [embla, setScrollSnaps, onSelect])

  return (
    <>
      <div className="relative flex justify-center items-center rounded-2xl w-full">
        <div
          className="overflow-hidden mx-3 rounded-2xl md:mx-24 lg:mx-28 xl:mx-36 2xl:mx-56"
          ref={viewportRef}
        >
          <div className="flex w-full lg:px-24 h-full xl:px-36">
            {posts.map((post, index) => (
              <div
                key={index}
                className="flex flex-col justify-center bg-white rounded-2xl mr-3 flex-shrink-0 flex-grow-0 basis-full md:basis-2/4 lg:basis-2/6"
              >
                <img
                  className="object-cover rounded-t-2xl w-full h-24"
                  src={post.img.url}
                  alt="blog"
                />
                <div className="flex justify-center items-center flex-col p-2">
                  <h1 className="font-bold flex justify-center my-1 items-center">
                    {post.title}
                  </h1>
                  <p className="block opacity-60 text-sm relative overflow-ellipsis">
                    {post.text}
                  </p>
                  <h3 className="font-semibold text-sm mt-2 text-red-400/70">
                    author:{post.author}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
