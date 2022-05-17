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
  { img: "/banner2.png", imgMobile: "/banner1_mobile.png" }
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
    <div>
      <div className="relative rounded-lg p-1 flex justify-center items-center">
        <div
          className="overflow-hidden w-full max-w-[2000px] "
          ref={viewportRef}
        >
          <div className="flex">
            {slides.map((item, index) => (
              <div className="relative min-w-full" key={index}>
                <div className="relative overflow-hidden">
                  <Image
                    className="object-cover min-h-full max-h-[900px] min-w-full rounded-2xl "
                    src={item.imgMobile}
                    width="2000"
                    height="900"
                    layout="responsive"
                    alt="banner"
                  />
                </div>
                <div className="relative overflow-hidden hidden">
                  <Image
                    className="object-cover min-h-full max-h-[900px] min-w-full rounded-2xl "
                    src={item.img}
                    width="2000"
                    height="900"
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
      <div className="relative -mt-4 px-6 w-full">
        <div className="bg-white border shadow-sm space-y-2 py-2 px-2 rounded-2xl flex justify-around flex-col items-center ">
          <span className="text-xl font-black text-red-400 ">
            The Fashion of Champion
          </span>
          <p className="text-center text-sm text-gray-900/70">
            Shop official merch from HappyFeet, the world’s premier sneaker and
            streetwear marketplace.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="bg-red-400/80 text-white px-2 rounded-xl font-bold text-sm py-1 italic"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
