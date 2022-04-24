import React, { useState, useEffect, useCallback } from "react"
import {
  DotButton,
  PrevButton,
  NextButton
} from "../EmblaCarouselButtons/EmblaCarouselButtons"
import useEmblaCarousel from "embla-carousel-react"
/* import { mediaByIndex } from "../../../constants/index" */
import Image from "next/image"

const slides = [
  {
    img: "/./banner3.jpg"
  },
  { img: "/./banner4.jpg" }
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
    <div className="flex justify-center">
      <div className="relative flex justify-center items-center rounded-lg p-1 w-full aspect-video max-h-[900px] ">
        <div
          className="overflow-hidden max-w-[1600px] rounded-lg w-full h-full"
          ref={viewportRef}
        >
          <div className="flex group h-full">
            {slides.map((item, index) => (
              <div
                className="relative min-w-full grayscale group-hover:grayscale-0 transition-all duration-500 ease-in-out "
                key={index}
              >
                <div className="relative w-full h-full">
                  <p className="absolute right-10 top-2/4 w-24 text-xl text-slate-700 opacity-80 font-bold break-words sm:text-3xl sm:top-[40%] sm:w-36 md:text-5xl md:w-60 lg:text-7xl lg:w-96 xl:w-[500px] xl:text-8xl">
                    The Fashion of Champion
                  </p>
                </div>
                <div className="absolute w-2/4 h-3/4 bottom-0 ">
                  <Image
                    className="rounded-t-full object-cover "
                    width={0}
                    height={0}
                    layout="fill"
                    src={item.img}
                    alt="banner"
                  />
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
    </div>
  )
}

export default EmblaCarousel
