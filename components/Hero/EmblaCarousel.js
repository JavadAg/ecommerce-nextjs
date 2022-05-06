import React, { useState, useEffect, useCallback } from "react"
import { DotButton, PrevButton, NextButton } from "./EmblaButtons"
import useEmblaCarousel from "embla-carousel-react"
/* import { mediaByIndex } from "../../../constants/index" */
import Image from "next/image"

const slides = [
  {
    img: "/banner1.png"
  },
  { img: "/banner2.png" }
]

const EmblaCarousel = () => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
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
      <div className="relative rounded-lg p-1 flex justify-center items-center">
        <div
          className="overflow-hidden w-full max-w-[2000px] "
          ref={viewportRef}
        >
          <div className="flex">
            {slides.map((item, index) => (
              <div className="relative  min-w-full " key={index}>
                <div className="relative min-h-64 overflow-hidden">
                  <Image
                    className="object-cover min-h-full min-w-full rounded-2xl"
                    src={item.img}
                    width="2000px"
                    height="680px"
                    layout="responsive"
                    alt="banner"
                  />
                  <div className="absolute bg-slate-50/30 m-0 top-2/4 left-4 rounded-2xl px-8 py-4 h-2/4 z-10 -translate-y-2/4 flex justify-around flex-col items-center backdrop-blur-2xl">
                    <p className="text-6xl font-black text-slate-700 ">
                      The Fashion of Champion
                    </p>
                    <button className="bg-red-400 text-white px-4 rounded-xl font-bold text-sm py-2">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden sm:block">
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
        <div className="flex absolute bottom-1 justify-center  ">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
