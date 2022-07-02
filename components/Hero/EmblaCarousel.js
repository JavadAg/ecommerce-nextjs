import React, { useState, useEffect, useCallback } from "react"
import { DotButton, PrevButton, NextButton } from "./EmblaButtons"
import useEmblaCarousel from "embla-carousel-react"

import Image from "next/image"
import { useRouter } from "next/router"

const slides = [
  {
    img: "/banner1.png",
    imgMobile: "/banner1_mobile.png"
  },
  { img: "/banner2.png", imgMobile: "/banner2_mobile.png" }
]

const EmblaCarousel = () => {
  const router = useRouter()
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
    <div className="md:relative">
      <div className="relative rounded-md flex justify-center items-center">
        <div
          className="overflow-hidden w-full max-w-[2000px] "
          ref={viewportRef}
        >
          <div className="flex">
            {slides.map((item, index) => (
              <div className="relative min-w-full" key={index}>
                <div className="relative overflow-hidden rounded-b-2xl md:hidden">
                  <Image
                    className="object-cover min-h-full max-h-[900px] min-w-full rounded-b-md"
                    src={item.imgMobile}
                    width="1200"
                    height="900"
                    priority="true"
                    layout="responsive"
                    alt="banner"
                  />
                </div>
                <div className="relative overflow-hidden hidden md:block ">
                  <Image
                    className="object-cover min-h-full max-h-[900px] min-w-full "
                    src={item.img}
                    width="2000"
                    height="900"
                    priority="true"
                    layout="responsive"
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
        <div className="flex absolute bottom-5 justify-center  ">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
      <div className="relative -mt-4 px-6 w-full md:absolute md:top-[35%] md:w-5/12 md:left-10 lg:top-1/4 xl:top-[35%]">
        <div className="bg-white dark:bg-zinc-800 border dark:border-zinc-800 shadow-sm space-y-2 py-2 px-2 rounded-2xl flex justify-around flex-col items-center md:py-6 lg:py-10 lg:space-y-12">
          <span className="text-xl text-center font-black text-red-400 lg:text-3xl">
            The Fashion of Champion
          </span>
          <p className="text-center text-sm text-zinc-900/70 dark:text-gray-100/70 lg:text-xl">
            Shop official merch from HappyFeet, the world’s premier sneaker and
            streetwear marketplace.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="bg-red-400/80 text-white dark:text-gray-100 px-2 rounded-xl font-bold text-sm py-1 italic lg:text-base"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
