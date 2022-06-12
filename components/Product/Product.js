import React, { useState } from "react"
import { useRouter } from "next/router"
import { HiHeart } from "react-icons/hi"
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Image from "next/image"
import { gql } from "graphql-request"
import { request } from "../../lib/graphcms"

const Product = ({ item }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const notify = (message) =>
    toast.warn(message, {
      position: "bottom-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      closeButton: false,
      draggable: true,
      progress: undefined
    })

  const success = (message) =>
    toast.success(message, {
      position: "bottom-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      closeButton: false,
      draggable: true,
      progress: undefined
    })

  const warn = (message) =>
    toast.warn(message, {
      position: "bottom-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      closeButton: false,
      draggable: true,
      progress: undefined
    })

  const handleWishlist = async (e, item) => {
    e.stopPropagation()
    if (status !== "authenticated") {
      return notify("Please login first")
    } else {
      //query user
      const query = gql`
      query MyQuery {
        nextUser(where: {id: "${session.user.id}"}) {
          id
          wishlist
        }
      }
      `

      let { nextUser } = await request({
        query: query
      })
      const { wishlist } = nextUser

      //check if product already exist
      const index = await wishlist.findIndex(
        (wish) => wish.id == String(item.id)
      )
      const { id, name, brand, img, slug } = item
      let image = img[0]
      if (index === -1) {
        wishlist.push({ id, name, brand, image, slug })
      } else {
        return warn("already in wishlist")
      }

      //if not exist add it to wishlist
      let mutate = gql`
        mutation MyMutation($wishlist: [Json!] =${JSON.stringify(
          wishlist
        ).replace(/"([^"]+)":/g, "$1:")}) {
          updateNextUser(
            where: { id: "${session.user.id}" }
            data: { wishlist: $wishlist }
          ) {
            wishlist
          }
        }
      `
      await request({
        query: mutate
      })

      //since graphcms doesnt publish new document, we need to manually publish the newly created document
      let mutate1 = gql`
      mutation MyMutation {
        publishNextUser(where: { id: "${session.user.id}" }) {
          id
          username
          email
          wishlist
        }
      }
    `
      await request({
        query: mutate1
      })
    }

    success("added to wishlist")
  }

  return (
    <>
      <div
        onClick={() => {
          router.push(`/shop/${item.slug}`),
            undefined,
            {
              shallow: true
            }
        }}
        className="relative bg-white rounded-2xl hover:ring-2 ring-red-300 ring-opacity-50 ring-offset-4 transition-all ease-in-out duration-500 shadow-sm shadow-gray-100"
      >
        <div className="p-2">
          <div
            onClick={(e) => handleWishlist(e, item)}
            className={`absolute right-2 top-2 rounded-2xl flex justify-center text-center items-center text-xl font-bold   z-10 lg:text-3xl cursor-pointer text-gray-200`}
          >
            <HiHeart />
          </div>
          <Image
            className="object-contain "
            layout="responsive"
            width="0"
            height="0"
            src={item.img[0].url}
            alt={item.name}
          />
        </div>
        <div className="mt-4 flex justify-center items-center flex-col space-y-1">
          <span className="text-sm p-1 text-gray-500 font-semibold">
            {item.name}
          </span>
          <span className="text-xs text-red-700 font-medium ">
            {item.brand}
          </span>

          <div className="space-x-1 pb-1 flex items-center justify-center">
            <span
              className={`text-sm font-semibold bg-red-400 px-2 rounded-2xl my-1 text-gray-100 lg:text-base ${
                item.discountprice && "line-through bg-gray-400/50"
              }`}
            >
              {item.price} $
            </span>
            {item.discountprice > 0 && (
              <span className="text-sm font-semibold  lg:text-base bg-red-400 px-2 rounded-2xl text-gray-100">
                {item.discountprice} $
              </span>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default Product
