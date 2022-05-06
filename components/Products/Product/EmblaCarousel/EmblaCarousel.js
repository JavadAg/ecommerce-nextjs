import React, { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Thumb } from "./EmblaThumb"
import Image from "next/image"
import { HiHeart } from "react-icons/hi"

const EmblaCarousel = ({ slides, img }) => {
  const media = [img[0], img[1]]
  const mediaByIndex = (index) => media[index % media.length]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    selectedClass: "",
    dragFree: true
  })

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index)
    },
    [embla, emblaThumbs]
  )

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return
    setSelectedIndex(embla.selectedScrollSnap())
    emblaThumbs.scrollTo(embla.selectedScrollSnap())
  }, [embla, emblaThumbs, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()

    embla.on("select", onSelect)
  }, [embla, onSelect])

  return (
    <>
      <div className="relative p-2 max-w-2xl ml-auto mr-auto w-full">
        <div className="absolute right-2 top-4 w-10 h-5 rounded-2xl flex justify-center text-center items-center text-xl font-bold text-slate-300 active:text-red-500 z-10 lg:text-3xl">
          <HiHeart />
        </div>
        <div className="overflow-hidden w-full" ref={mainViewportRef}>
          <div className="flex select-none ">
            {slides.map((index) => (
              <div className="min-w-full relative" key={index}>
                <div className="relative overflow-hidden h-64 bg-gray-50 rounded-2xl">
                  <Image
                    className="object-contain "
                    src={mediaByIndex(index)}
                    layout="fill"
                    width="0"
                    height="0"
                    alt="A cool shoe."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-slate-200 py-2 max-w-2xl w-full">
        <div className="overflow-hidden w-full" ref={thumbViewportRef}>
          <div className="flex cursor-default ">
            {slides.map((index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={mediaByIndex(index)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default EmblaCarousel
