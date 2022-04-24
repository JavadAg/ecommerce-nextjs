import React, { useState, useEffect, useCallback } from "react"
import { PrevButton, NextButton } from "../EmblaCarouselButton/EmblaButton"
import useEmblaCarousel from "embla-carousel-react"

const fakeBlog = [
  {
    img: "/./blogphoto.png",
    title: "Lorem Ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar laoreet arcu, sit amet vehicula risus fringilla eu. Etiam ornare posuere lacinia. Praesent tempor dignissim risus at suscipit. Nunc et maximus purus. Nam tempus enim quis eros pharetra .",
    author: "Javad aghebati"
  },
  {
    img: "/./blogphoto.png",
    title: "Lorem Ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar laoreet arcu, sit amet vehicula risus fringilla eu. Etiam ornare posuere lacinia. Praesent tempor dignissim risus at suscipit. Nunc et maximus purus. Nam tempus enim quis eros pharetra .",
    author: "Javad aghebati"
  },
  {
    img: "/./blogphoto.png",
    title: "Lorem Ipsum",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar laoreet arcu, sit amet vehicula risus fringilla eu. Etiam ornare posuere lacinia. Praesent tempor dignissim risus at suscipit. Nunc et maximus purus. Nam tempus enim quis eros pharetra .",
    author: "Javad aghebati"
  }
]

const EmblaCarousel = ({ slides }) => {
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
      <div className="relative flex justify-center items-center rounded-lg p-1 w-full ">
        <div className="overflow-hidden  rounded-lg" ref={viewportRef}>
          <div className="flex px-4 lg:px-24 gap-4 h-full xl:px-36">
            {fakeBlog.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center bg-white rounded-2xl min-w-full sm:min-w-[50%] lg:min-w-[30%]"
              >
                <img
                  className="object-cover rounded-2xl w-full h-24"
                  src={item.img}
                  alt="blog"
                />
                <h1 className="font-bold flex justify-center my-1 items-center">
                  {item.title}
                </h1>
                <p className="block opacity-60 text-ellipsis overflow-hidden w-3/4 h-24 text-sm relative left-4">
                  {item.text}
                </p>
                <h3 className="font-semibold text-sm my-2 opacity-70 relative left-4 text-blue-800">
                  author:{item.author}
                </h3>
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
