import React from "react"
import { HiX, HiMenuAlt2 } from "react-icons/hi"
import Link from "next/link"
import { signOut } from "next-auth/react"

const MobileSidebar = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="sm:hidden">
      <button
        className="flex justify-center items-center relative "
        onClick={() => setOpen(!open)}
      >
        <HiMenuAlt2 />
      </button>
      <div
        className={`transition-all  ease-in-out duration-500 fixed overflow-x-hidden top-2 left-0 bottom-2 bg-gray-50 shadow-lg rounded-r-2xl ${
          !open ? "w-0" : "w-2/3 "
        }
        `}
      >
        <div className="flex relative flex-col items-center top-2 justify-between space-y-4">
          <div className="flex flex-row justify-between relative w-full px-2  items-center">
            <button
              onClick={() => setOpen(!open)}
              className="bg-slate-200 p-2 rounded-xl"
            >
              <HiX />
            </button>

            <p className="bg-slate-100 p-2 rounded-2xl font-bold ">HappyFeet</p>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="flex flex-col items-start w-11/12 gap-5"
          >
            <div className="w-full">
              <Link className="font-semibold " href={"/shop"}>
                <p className="hover:bg-white bg-gray-100 w-full p-2 rounded-2xl ">
                  Shop
                </p>
              </Link>
            </div>
            <div className="w-full">
              <Link className="font-semibold " href={"/shop/men"}>
                <p className="hover:bg-white bg-gray-100 w-full p-2 rounded-2xl ">
                  Men
                </p>
              </Link>
            </div>
            <div className="w-full">
              <Link className="font-semibold " href={"/shop/women"}>
                <p className="hover:bg-white bg-gray-100 w-full p-2 rounded-2xl ">
                  Women
                </p>
              </Link>
            </div>
            <div className="w-full">
              <Link className="font-semibold " href={"/shop/kids"}>
                <p className="hover:bg-white bg-gray-100 w-full p-2 rounded-2xl ">
                  Kids
                </p>
              </Link>
            </div>
            <div
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full"
            >
              <p className="hover:bg-white bg-gray-100 w-full p-2 rounded-2xl ">
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileSidebar
