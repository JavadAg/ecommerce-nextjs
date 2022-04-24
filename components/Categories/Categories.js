import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

const Categories = ({ data }) => {
  const kidsQuantity = data.filter((item) => item.type === "kids")
  const menQuantity = data.filter((item) => item.type === "men")
  const womenQuantity = data.filter((item) => item.type === "women")
  const router = useRouter()

  return (
    <div>
      <div className="flex  flex-col justify-center items-center mt-10 px-4 md:px-10 lg:px-24 xl:px-36">
        <div
          before="Categories"
          className="relative mb-4 flex justify-center items-center text-center gap-2 after:content-[attr(before)] after:opacity-5 after:absolute after:font-black after:tracking-wide after:text-4xl"
        >
          <p
            className={`text-sm font-bold text-slate-700 transition-colors ease-in-out duration-500 leading-10 lg:text-lg `}
          >
            Shop by categories
          </p>
        </div>

        <div className="relative py-2 px-2 flex flex-col justify-center items-center h-full gap-4 w-full rounded-2xl bg-gray-50">
          <div className=" flex gap-4 w-full  ">
            <div
              onClick={() => router.push("/shop")}
              className="w-8/12 relative grayscale  hover:grayscale-0 transition-all group duration-500 ease-in-out"
            >
              <img
                className="object-cover flex justify-center h-full items-center w-full rounded-2xl brightness-50 group-hover:brightness-100 transition-all group duration-500 ease-in-out"
                src="/./all.png"
                alt="all"
              />
              <div className="absolute bg-white   rounded-xl bottom-2 left-2 flex flex-col text-center">
                <p className=" font-bold text-sm lg:text-base">All</p>
                <p className="bg-red-600 text-sm text-slate-100 px-6 rounded-b-xl lg:w-24">
                  {data.length}
                </p>
              </div>
            </div>
            <div
              onClick={() => router.push("/shop/kids")}
              className=" w-4/12 relative grayscale hover:grayscale-0 transition-all group duration-500 ease-in-out"
            >
              <img
                className="object-cover h-full flex justify-center items-center w-full rounded-2xl brightness-50 group-hover:brightness-100 transition-all group duration-500 ease-in-out"
                src="/./kids.png"
                alt="kids"
              />
              <div className="absolute bg-white   rounded-xl bottom-2 left-2 flex flex-col text-center">
                <p className="font-bold text-sm lg:text-base">Kids</p>
                <p className="bg-gray-900 text-sm text-slate-50 px-6 rounded-b-xl lg:w-24">
                  {kidsQuantity.length}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div
              onClick={() => router.push("/shop/men")}
              className="w-2/4 relative grayscale hover:grayscale-0 transition-all group duration-500 ease-in-out"
            >
              <Image
                className="object-cover w-full rounded-2xl brightness-50 group-hover:brightness-100 transition-all group duration-500 ease-in-out"
                src="/./men.png"
                layout="responsive"
                width="0"
                height="0"
              />
              <div className="absolute bg-white   rounded-xl bottom-2 left-2 flex flex-col text-center">
                <p className="font-bold text-sm lg:text-base lg:w-24">Men</p>
                <p className="bg-gray-900 text-sm text-slate-50 px-6 rounded-b-xl">
                  {menQuantity.length}
                </p>
              </div>
            </div>
            <div
              onClick={() => router.push("/shop/women")}
              className="w-2/4 relative grayscale hover:grayscale-0 transition-all group duration-500 ease-in-out"
            >
              <Image
                className="object-cover w-full rounded-2xl brightness-50 group-hover:brightness-100 transition-all group duration-500 ease-in-out"
                src="/./women.png"
                layout="responsive"
                width="0"
                height="0"
              />
              <div className="absolute bg-white rounded-xl bottom-2 left-2 flex flex-col text-center">
                <p className="font-bold text-sm lg:text-base lg:w-24">Women</p>
                <p className="bg-gray-900 text-sm text-slate-50 px-6 rounded-b-xl">
                  {womenQuantity.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
