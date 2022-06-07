import React from "react"
import {
  HiX,
  HiMenuAlt2,
  HiOutlineShoppingBag,
  HiArrowSmLeft
} from "react-icons/hi"
import { GrUser, GrUserFemale } from "react-icons/gr"
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
        onClick={() => setOpen(!open)}
        className={`flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50   h-screen  ${
          !open ? "w-0" : "w-full backdrop-blur-sm"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`transition-all ease-in-out duration-300 fixed overflow-x-hidden top-2 left-0 bottom-2 bg-white shadow-lg rounded-r-2xl  ${
            !open ? "w-0" : "w-2/3"
          } 
        `}
        >
          <div className="flex relative flex-col items-center top-2 justify-between space-y-4">
            <div className="flex flex-row justify-between relative w-full px-2 items-center">
              <button
                onClick={() => setOpen(!open)}
                className="bg-gray-100 p-2 rounded-xl"
              >
                <HiX />
              </button>
              <span
                className="before:block before:absolute before:-inset-0 before:-mx-1 
            before:-skew-y-3 before:bg-red-400 relative inline-block cursor-pointer right-2"
              >
                <span className="font-black text-white relative italic lg:text-lg xl:text-xl">
                  HappyFeet
                </span>
              </span>
            </div>
            <div
              onClick={() => setOpen(!open)}
              className="flex flex-col items-start w-11/12 gap-5"
            >
              <div className="w-full">
                <Link href={"/shop"}>
                  <div className="hover:bg-gray-100 bg-gray-50 w-full p-2 rounded-2xl space-x-2 flex justify-start items-center duration-300">
                    <i>
                      <HiOutlineShoppingBag />
                    </i>
                    <span>Shop</span>
                  </div>
                </Link>
              </div>
              <div className="w-full">
                <Link className="font-semibold " href={"/shop/men"}>
                  <div className="hover:bg-gray-100 bg-gray-50 w-full p-2 rounded-2xl space-x-2 flex justify-start items-center duration-300">
                    <i>
                      <GrUser />
                    </i>
                    <span>Men</span>
                  </div>
                </Link>
              </div>
              <div className="w-full">
                <Link className="font-semibold " href={"/shop/women"}>
                  <div className="hover:bg-gray-100 bg-gray-50 w-full p-2 rounded-2xl space-x-2 flex justify-start items-center duration-300">
                    <i>
                      <GrUserFemale />
                    </i>
                    <span>Women</span>
                  </div>
                </Link>
              </div>
              <div className="w-full">
                <Link className="font-semibold " href={"/shop/kids"}>
                  <div className="hover:bg-gray-100 bg-gray-50 w-full p-2 rounded-2xl space-x-2 flex justify-start items-center duration-300">
                    <i>
                      <HiOutlineShoppingBag />
                    </i>
                    <span>Kids</span>
                  </div>
                </Link>
              </div>
              <div
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full"
              >
                <div className="hover:bg-red-500 bg-red-400 text-white w-full p-2 rounded-2xl space-x-2 flex justify-start items-center duration-300">
                  <i>
                    <HiArrowSmLeft />
                  </i>
                  <span>Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileSidebar
