import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineHeart,
  HiSearch
} from "react-icons/hi"
import MobileNavbar from "./Mobile/MobileNavbar"
import MobileSidebar from "./Mobile/MobileSidebar"
import { useSelector } from "react-redux"
import Search from "../Search/Search"
import UserAuth from "../UserAuth/UserAuth"

const Header = () => {
  const router = useRouter()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    window.addEventListener("scroll", isSticky)
  }, [])

  const [sticky, setSticky] = useState(false)
  const isSticky = () => {
    const scrollTop = window.scrollY
    scrollTop >= 200 ? setSticky(true) : setSticky(false)
  }

  return (
    <div>
      <MobileNavbar />
      <div className="flex z-50 justify-center items-center w-full h-16  fixed">
        <div
          className={`bg-white flex flex-row-reverse justify-between items-center  bottom-0 h-[calc(10px+4vh)] px-3 shadow-md sm:flex-row  md:px-4 ${
            sticky
              ? "absolute top-0 left-0 right-0 w-full "
              : "rounded-xl w-full mx-2"
          }`}
        >
          <Link href="/">
            <span
              className="before:block before:absolute before:-inset-0 before:-mx-1 
            before:-skew-y-3 before:bg-red-400 relative inline-block cursor-pointer"
            >
              <span className="font-black text-white relative italic lg:text-lg xl:text-xl">
                HappyFeet
              </span>
            </span>
          </Link>
          <MobileSidebar />
          <div className="hidden sm:flex">
            <ul className="hidden text-sm font-semibold gap-2 sm:flex md:text-md lg:text-lg xl:text-lg md:gap-4 xl:gap-8">
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="/shop/men">Men</Link>
              </li>
              <li>
                <Link href="/shop/women">Women</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
              <li>
                <Link href="#">On Sale</Link>
              </li>
            </ul>
          </div>
          <div className="hidden sm:flex text-lg gap-2 md:text-xl lg:text-2xl xl:text-2xl">
            <UserAuth />
            <Link href="/cart">
              <div className="relative">
                {cart.length > 0 && (
                  <span
                    className={`absolute bottom-4 left-1 bg-red-400 rounded-full h-5 w-5 flex justify-center items-center z-10 font-bold text-sm `}
                  >
                    {cart.length}
                  </span>
                )}
                <i className="cursor-pointer">
                  <HiOutlineShoppingCart />
                </i>
              </div>
            </Link>
            <i className="cursor-pointer">
              <HiOutlineHeart />
            </i>
            <Search />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
