import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineHeart,
  HiMenuAlt2,
  HiX,
  HiSearch
} from "react-icons/hi"
import MobileNavbar from "./Mobile/MobileNavbar"
import MobileSidebar from "./Mobile/MobileSidebar"

const Header = () => {
  useEffect(() => {
    window.addEventListener("scroll", isSticky)
  }, [scroll])

  const [sticky, setSticky] = useState(false)
  const isSticky = () => {
    const scrollTop = window.scrollY
    scrollTop >= 200 ? setSticky(true) : setSticky(false)
  }

  return (
    <div>
      <MobileNavbar />
      <div className="flex z-50 justify-center items-center w-full h-[calc(20px+5vh)] fixed">
        <div
          className={`bg-white  flex flex-row-reverse  justify-between items-center absolute bottom-0 h-[calc(10px+4vh)] px-2 shadow-md sm:flex-row md:px-4 ${
            sticky ? " top-0 left-0 right-0 w-full " : "rounded-xl w-11/12 "
          }`}
        >
          <Link href="/">
            <p className="font-black lg:text-lg xl:text-xl">HappyFeet</p>
          </Link>
          <MobileSidebar />
          <div className="hidden sm:flex">
            <ul className="hidden text-sm font-semibold gap-2 sm:flex md:text-md lg:text-lg xl:text-xl ">
              <li>
                <Link href="#">Blog</Link>
              </li>
              <li>
                <Link href="#">Men</Link>
              </li>
              <li>
                <Link href="#">Women</Link>
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
          <div className="hidden sm:flex text-lg gap-2 md:text-xl lg:text-2xl xl:text-3xl">
            <i>
              <HiOutlineUser />
            </i>
            <Link href="/cart">
              <i>
                <HiOutlineShoppingCart />
              </i>
            </Link>
            <i>
              <HiOutlineHeart />
            </i>
            <i>
              <HiSearch />
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
