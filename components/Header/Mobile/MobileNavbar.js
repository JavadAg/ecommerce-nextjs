import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import {
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineHeart,
  HiSearch,
  HiOutlineHome
} from "react-icons/hi"
import Link from "next/link"
import { useSelector } from "react-redux"

const navItems = [
  {
    name: "Profile",
    icon: <HiOutlineUser />,
    href: "/profile"
  },
  {
    name: "Cart",
    icon: <HiOutlineShoppingCart />,
    href: "/cart"
  },
  {
    name: "Home",
    icon: <HiOutlineHome />,
    href: "/"
  },
  {
    name: "Search",
    icon: <HiSearch />,
    href: "/search"
  },
  {
    name: "Wishlist",
    icon: <HiOutlineHeart />,
    href: "/wishlist"
  }
]

const MobileNavbar = () => {
  const cart = useSelector((state) => state.cart)
  const router = useRouter()
  const [active, setActive] = useState(navItems[2])

  return (
    <div className="flex sm:hidden z-50 w-full justify-center items-center fixed bottom-2">
      <ul className=" rounded-2xl bg-gray-200 shadow-sm flex justify-center  items-center w-[90%] ">
        {cart.length > 0 && (
          <div
            className={`absolute left-[30%] bottom-8 bg-red-400 rounded-full h-5 w-5 flex justify-center items-center z-10 font-bold text-xs duration-300 ${
              router.pathname == navItems[1].href
                ? "-translate-y-6 rounded-full "
                : ""
            }`}
          >
            {cart.length}
          </div>
        )}
        {navItems.map((item) => (
          <li
            onClick={() => setActive(item)}
            key={item.name}
            className="w-full px-2 flex justify-center items-center  h-12 "
          >
            <Link href={item.href}>
              <div className="flex flex-col justify-center items-center">
                <i
                  className={` flex justify-center items-center text-2xl p-3  absolute duration-300  ${
                    router.pathname == item.href
                      ? "-translate-y-6 rounded-full bg-gray-200"
                      : ""
                  }`}
                >
                  {item.icon}
                </i>
                <span
                  className={`flex justify-center items-center absolute font-bold text-sm duration-300 transition-opacity ease-in-out ${
                    router.pathname == item.href ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileNavbar
