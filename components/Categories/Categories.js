import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"

const Categories = ({ data }) => {
  const kidsQuantity = data?.filter((item) => item.category === "kids")
  const menQuantity = data?.filter((item) => item.category === "men")
  const womenQuantity = data?.filter((item) => item.category === "women")
  const router = useRouter()

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-5 px-2 md:px-24 lg:px-28 xl:px-36 2xl:px-56">
        <div
          before="Categories"
          className="relative mb-4 flex justify-center items-center text-center gap-2 after:content-[attr(before)] after:opacity-5 after:absolute after:font-black after:tracking-wide after:text-4xl"
        >
          <p
            className={`text-sm font-bold text-slate-700 transition-colors ease-in-out duration-500 leading-10 lg:text-base dark:text-slate-200`}
          >
            Shop by categories
          </p>
        </div>

        <div className="relative px-2 md:px-0 flex flex-col justify-center items-center h-full gap-2 w-full md:gap-4">
          <div className="flex gap-2 w-full md:gap-4">
            <div
              onClick={() => router.push("/shop")}
              className="w-8/12 relative grayscale  hover:grayscale-0 transition-all group duration-500 ease-in-out hover:ring-2 ring-red-300/50  ring-offset-2 dark:ring-offset-slate-900 rounded-2xl cursor-pointer"
            >
              <Image
                className="object-cover flex justify-center h-full items-center w-full rounded-2xl brightness-50 group-hover:brightness-100 transition-all group duration-500 ease-in-out "
                src="/all.png"
                alt="all"
                layout="fill"
              />
              <div className="absolute bg-white dark:bg-slate-900 rounded-sm bottom-2 left-2 flex flex-col text-center">
                <p className=" font-bold text-sm lg:text-base dark:text-gray-300">
                  All
                </p>
                <p className="bg-red-600 text-sm text-slate-100 px-6 rounded-b-sm lg:w-24">
                  {data?.length}
                </p>
              </div>
            </div>
            <div
              onClick={() => router.push("/shop/kids")}
              className="w-4/12 relative grayscale hover:grayscale-0 transition-all group duration-500 ease-in-out rounded-2xl hover:ring-2 ring-red-300/50 ring-offset-2 dark:ring-offset-slate-900 cursor-pointer"
            >
              <Image
                className="object-cover w-full rounded-2xl brightness-50 group-hover:brightness-100 transition-all group duration-500 ease-in-out"
                src="/kids.png"
                alt="kids"
                width="0"
                layout="responsive"
                height="0"
              />
              <div className="absolute bg-white dark:bg-slate-800 rounded-sm bottom-2 left-2 flex flex-col text-center">
                <p className="font-bold text-sm lg:text-base dark:text-slate-300">
                  Kids
                </p>
                <p className="bg-gray-900 text-sm text-slate-50 dark:text-slate-300 px-6 rounded-b-sm lg:w-24">
                  {kidsQuantity?.length}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full md:gap-4">
            <div
              onClick={() => router.push("/shop/men")}
              className="w-2/4 relative grayscale hover:grayscale-0 transition-all group duration-500 ease-in-out hover:ring-2 ring-red-300/50 ring-offset-2 dark:ring-offset-slate-900 rounded-2xl cursor-pointer"
            >
              <Image
                className="object-cover w-full rounded-2xl brightness-50 group-hover:brightness-100 transition-all group duration-500 ease-in-out"
                src="/men.png"
                layout="responsive"
                width="0"
                alt="men"
                height="0"
              />
              <div className="absolute bg-white dark:bg-slate-800 rounded-sm bottom-2 left-2 flex flex-col text-center">
                <p className="font-bold text-sm lg:text-base lg:w-24 dark:text-slate-300">
                  Men
                </p>
                <p className="bg-gray-900 text-sm text-slate-50 dark:text-slate-300 px-6 rounded-b-sm">
                  {menQuantity?.length}
                </p>
              </div>
            </div>
            <div
              onClick={() => router.push("/shop/women")}
              className="w-2/4 relative grayscale hover:grayscale-0 transition-all group duration-500 ease-in-out hover:ring-2 ring-red-300/50 ring-offset-2 dark:ring-offset-slate-900 rounded-2xl cursor-pointer"
            >
              <Image
                className="object-cover w-full rounded-2xl brightness-50 group-hover:brightness-100 transition-all group duration-500 ease-in-out"
                src="/women.png"
                layout="responsive"
                width="0"
                alt="women"
                height="0"
              />
              <div className="absolute bg-white dark:bg-slate-800 rounded-sm bottom-2 left-2 flex flex-col text-center">
                <p className="font-bold text-sm lg:text-base lg:w-24 dark:text-slate-300">
                  Women
                </p>
                <p className="bg-gray-900 text-sm text-slate-50 dark:text-slate-300 px-6 rounded-b-sm">
                  {womenQuantity?.length}
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
