import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { HiOutlineUser } from "react-icons/hi"

const UserAuth = () => {
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        <HiOutlineUser />
      </button>
      {showModal ? (
        <div
          onClick={() => setShowModal(false)}
          className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-screen bg-gradient-to-br from-gray-200/20 to-gray-300/20 backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()} className="py-12 px-6">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div className="flex justify-center items-center flex-col p-5 space-y-6 bg-white shadow-lg rounded-lg text-center w-full">
                <span
                  className="before:block before:absolute before:-inset-0 before:-mx-1 
            before:-skew-y-3 before:bg-red-400 relative inline-block cursor-pointer"
                >
                  <span className="font-black text-white relative italic lg:text-lg xl:text-xl">
                    HappyFeet
                  </span>
                </span>
                <h4
                  className="flex justify-center w-full items-center text-center  before:content-[''] before:bg-black before:inline-block before:h-0.5 before:relative before:align-middle before:w-24 before:-ml-2/4 before:right-2
           after:content-[''] after:bg-black after:inline-block after:h-0.5 after:relative after:align-middle after:w-24 before:-ml-2/4 after:left-2 font-bold
            "
                >
                  Login
                </h4>

                <form
                  className="flex w-full flex-col justify-center items-center space-y-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    className={`block py-2 px-3 w-full rounded-xl border transition-all duration-500 ease-in-out outline-red-200 ${
                      errors.Username &&
                      "border-l-8 border bg-red-100/20 border-red-400"
                    }`}
                    type="text"
                    placeholder="Username"
                    {...register("Username", { required: true })}
                  />
                  {errors.Username?.type === "required" && (
                    <p className="font-semibold text-red-400 text-sm">
                      Username is required !
                    </p>
                  )}
                  <input
                    className={`block py-2 px-3 w-full rounded-xl border transition-all duration-500 ease-in-out outline-red-200 ${
                      errors.Password &&
                      "border-l-8 border bg-red-100/20 border-red-400"
                    }`}
                    type="password"
                    placeholder="Password"
                    {...register("Password", {
                      required: true,
                      min: 4
                    })}
                  />
                  {errors.Password?.type === "required" && (
                    <p className="font-semibold text-red-400 text-sm">
                      Password is required !
                    </p>
                  )}
                  <input
                    className="p-1 px-4 rounded-xl border bg-gradient-to-br from-gray-500 to-gray-700 text-white"
                    type="submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default UserAuth
