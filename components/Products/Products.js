import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { HiHeart } from "react-icons/hi"
import { useSession } from "next-auth/react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Products = ({ data }) => {
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

  const handleWishlist = (e, item) => {
    e.stopPropagation()
    if (status !== "authenticated") {
      notify("Please login first")
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_URL}/api/wishlist?id=${session.id}`,
          item
        )
        .then((res) => {
          res.status === 200
            ? success(res.data)
            : warn("Already in your wishlist")
        })
    }
  }

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center ">
          <div className=" py-6 px-4 md:px-10 w-full mt-24 xl:px-36">
            <div className="grid grid-cols-2 grid-rows-2 gap-y-10 gap-x-4 md:grid-cols-3 xl:grid-cols-4">
              {data?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    router.push(`/shop/${item.id}`),
                      undefined,
                      {
                        shallow: true
                      }
                  }}
                  className=" relative bg-white rounded-2xl hover:ring-2 ring-red-300 ring-opacity-50 ring-offset-4 transition-all ease-in-out duration-500 shadow-sm"
                >
                  <div className="p-2">
                    <div
                      onClick={(e) => handleWishlist(e, item)}
                      className="absolute right-2 top-2 rounded-2xl flex justify-center text-center items-center text-xl font-bold text-slate-200 active:text-red-500 z-10 lg:text-3xl"
                    >
                      <HiHeart />
                    </div>
                    <Image
                      className="object-contain "
                      layout="responsive"
                      width="0"
                      height="0"
                      src={item.img[0]}
                      alt={item.name}
                    />
                  </div>
                  <div className="mt-4 flex justify-center items-center flex-col space-y-1">
                    <span className="text-sm p-1 rounded-2xl text-gray-500 font-semibold">
                      {item.name}
                    </span>
                    <span className="text-xs text-red-700 font-medium ">
                      {item.brand}
                    </span>

                    <div className="space-x-1 flex items-center justify-center">
                      <span
                        className={`text-sm font-semibold bg-red-400 px-2 rounded-2xl  my-1 text-gray-100 space-x-1 lg:text-base ${
                          item.discountedPrice && "line-through bg-gray-500"
                        }`}
                      >
                        {item.price}$
                      </span>
                      {item.discountedPrice && (
                        <span className="text-sm font-semibold my-1 space-x-1 lg:text-base bg-red-400 px-2 rounded-2xl text-gray-100">
                          {item.discountedPrice}$
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        toastClassName={() =>
          "flex justify-center items-center bg-white border border-gray-200 text-gray-800 py-3 "
        }
        bodyClassName={() =>
          "flex justify-center items-center w-full font-bold"
        }
      />
    </>
  )
}

export default Products
