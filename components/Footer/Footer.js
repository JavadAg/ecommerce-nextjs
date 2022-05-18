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
    <div className="flex flex-col justify-center items-center mt-10 py-6 bg-white max-h-44">
      <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 lg:text-lg">
        <Link href="/about">
          <span className="cursor-pointer">About</span>
        </Link>
        <Link href="/blog">
          <span className="cursor-pointer">Blog</span>
        </Link>
        <Link href="/shop">
          <span className="cursor-pointer">Shop</span>
        </Link>
        <Link href="/contact">
          <span className="cursor-pointer">Contact us</span>
        </Link>
        <Link href="/partners">
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
