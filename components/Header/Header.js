import React, { useEffect, useState } from "react"
import Link from "next/link"
import { HiOutlineShoppingCart } from "react-icons/hi"
import MobileNavbar from "./Mobile/MobileNavbar"
import MobileSidebar from "./Mobile/MobileSidebar"
import Search from "../Search/Search"
import UserAuth from "../UserAuth/UserAuth"
import { useSession } from "next-auth/react"
import useShop from "../../utils/context"
import { useRouter } from "next/router"

const Header = () => {
  const router = useRouter()
  const { products } = useShop()
  const { data: session, status } = useSession()
  const [cart, setCart] = useState()

  //set cart length icon to newest value on route change
  useEffect(() => {
    setCart(products)
  }, [router.asPath])

  useEffect(() => {
    window.addEventListener("scroll", isSticky)
  }, [])

  //set header sticky
  const [sticky, setSticky] = useState(false)
  const isSticky = () => {
    const scrollTop = window.scrollY
    scrollTop >= 200 ? setSticky(true) : setSticky(false)
  }

  return (
    <div>
      <MobileNavbar />
      <div className="flex z-50 justify-center items-center w-full h-16 fixed">
        <div
          className={`bg-white flex flex-row-reverse justify-between items-center bottom-0 h-10 px-3 shadow-md sm:flex-row md:px-4 ${
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
              <span className="font-black text-white relative italic lg:text-lg xl:text-lg">
                HappyFeet
              </span>
            </span>
          </Link>
          <div className="flex justify-center items-center sm:hidden">
            <div className="flex justify-center items-center ">
              <MobileSidebar />
            </div>
            {session?.user?.name && (
              <>
                <div className="font-semibold text-sm ml-2">Hello</div>
                <div className="font-semibold text-sm ml-1 text-red-500">
                  {session?.user?.name}
                </div>
              </>
            )}
          </div>
          <div className="hidden sm:flex">
            <ul className="hidden text-sm font-semibold gap-2 sm:flex md:text-base lg:text-base xl:text-base md:gap-4 xl:gap-8">
              <li className="hover:text-red-400 duration-300">
                <Link href="/shop">Shop</Link>
              </li>
              <li className="hover:text-red-400 duration-300">
                <Link href="/shop/men">Men</Link>
              </li>
              <li className="hover:text-red-400 duration-300">
                <Link href="/shop/women">Women</Link>
              </li>
              <li className="hover:text-red-400 duration-300">
                <Link href="/shop/kids">Kids</Link>
              </li>
              <li className="hover:text-red-400 duration-300">
                <Link href="#">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="hidden sm:flex text-lg gap-2 md:text-xl lg:text-2xl xl:text-2xl">
            {session?.user?.name && (
              <div className="flex justify-center group cursor-pointer items-center space-x-1">
                <div className="font-semibold text-sm lg:text-base">Hello</div>
                <div className="font-semibold text-sm  text-red-500 lg:text-base">
                  {session?.user?.name}
                </div>
              </div>
            )}
            <UserAuth />
            <Link href="/cart">
              <div className="relative flex justify-center items-center">
                <span
                  before={cart?.length}
                  className={`cursor-pointer relative 
                  ${
                    cart?.length > 0 &&
                    "before:content-[attr(before)] before:absolute before:bg-red-400 before:h-4 before:w-4 before:text-sm before:font-bold before:rounded-full before:flex before:justify-center before:items-center before:text-white before:bottom-3 before:left-1 lg:before:bottom-4"
                  }
                  `}
                >
                  <HiOutlineShoppingCart />
                </span>
              </div>
            </Link>
            <Search />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
