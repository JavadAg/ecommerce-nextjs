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
    <div className="flex flex-col justify-center items-center mt-10 py-6 ">
      <div className="flex justify-center items-center space-x-4 text-sm text-gray-500 lg:text-lg">
        <p>About</p>
        <p>Blog</p>
        <p>Shop</p>
        <p>Contact us</p>
        <p>Partners</p>
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
        <p className="flex mb-12 text-xs mt-5 lg:text-base ">
          All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer
