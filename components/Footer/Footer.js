import Link from "next/link"
import React from "react"
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoPinterest,
  IoLogoWhatsapp,
  IoLogoFacebook
} from "react-icons/io"

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center  py-6 bg-white dark:bg-zinc-800">
      <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 dark:text-zinc-300 lg:text-base">
        <Link href="/#">
          <span className="cursor-pointer">About</span>
        </Link>
        <Link href="/#">
          <span className="cursor-pointer">Blog</span>
        </Link>
        <Link href="/shop">
          <span className="cursor-pointer">Shop</span>
        </Link>
        <Link href="/#">
          <span className="cursor-pointer">Contact us</span>
        </Link>
        <Link href="/#">
          <span className="cursor-pointer">Partners</span>
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-2 pt-6 text-md lg:text-lg">
        <i>
          <IoLogoFacebook />
        </i>
        <i>
          <IoLogoInstagram />
        </i>
        <i>
          <IoLogoPinterest />
        </i>
        <i>
          <IoLogoWhatsapp />
        </i>
        <i>
          <IoLogoTwitter />
        </i>
      </div>
      <div className="flex justify-center items-center">
        <span className="flex mb-12 text-xs mt-5 lg:text-base ">
          All Rights Reserved
        </span>
      </div>
    </div>
  )
}

export default Footer
