import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { HiShoppingCart, HiHome } from "react-icons/hi"
import Link from "next/link"
import Search from "../../Search/Search"
import UserAuth from "../../UserAuth/UserAuth"
import useShop from "../../../utils/context"

const MobileNavbar = () => {
  const { products } = useShop()
  const [cart, setCart] = useState()
  useEffect(() => {
    setCart(products)
  }, [])
  const router = useRouter()

  return (
    <div className="flex sm:hidden z-50 w-full justify-center items-center fixed bottom-2 ">
      <ul className=" bg-gray-200 relative rounded-2xl flex justify-center items-center w-11/12 z-50">
        <li className={`w-full px-2 flex justify-center items-center h-12`}>
          <i
            className={`flex justify-center items-center text-2xl p-3 relative `}
          >
            <UserAuth />
          </i>
        </li>
        <li className="w-full px-2 flex justify-center items-center h-12 cursor-pointer">
          <Link href="/cart">
            <div className="flex flex-col justify-center items-center relative">
              {cart?.length > 0 && (
                <div
                  className={`absolute bottom-8 bg-red-400 rounded-full h-5 w-5 flex justify-center items-center z-10 font-bold text-xs duration-300 ${
                    router.pathname === "/cart" ? "rounded-full " : ""
                  }`}
                >
                  {cart?.length}
                </div>
              )}
              <i
                className={`flex justify-center items-center text-2xl p-3 relative before:content-[''] before:h-10 before:w-10 before:bg-gray-200 before:absolute before:-z-10 before:opacity-0  before:duration-300 before:rounded-t-full`}
              >
                <HiShoppingCart
                  className={`duration-300 ${
                    router.pathname === "/cart"
                      ? " text-red-400 drop-shadow-[0px_0px_5px_#F87171]"
                      : ""
                  }`}
                />
              </i>
            </div>
          </Link>
        </li>
        <li className="w-full px-2 flex justify-center items-center h-12 cursor-pointer">
          <Link href="/">
            <div className="flex flex-col justify-center items-center ">
              <i
                className={`flex justify-center items-center text-2xl p-3 relative before:content-[''] before:h-10 before:w-10 before:bg-gray-200 before:absolute before:-z-10 before:opacity-0  before:duration-300 before:rounded-t-full ${
                  router.pathname === "/" ? " before:opacity-100" : ""
                }`}
              >
                <HiHome
                  className={`duration-300 ${
                    router.pathname === "/"
                      ? " text-red-400 drop-shadow-[0px_0px_5px_#F87171]"
                      : ""
                  }`}
                />
              </i>
            </div>
          </Link>
        </li>
        <li className="w-full px-2 flex justify-center items-center h-12 cursor-pointer">
          <i
            className={`flex justify-center items-center text-2xl p-3 relative `}
          >
            <Search />
          </i>
        </li>
      </ul>
    </div>
  )
}

export default MobileNavbar
