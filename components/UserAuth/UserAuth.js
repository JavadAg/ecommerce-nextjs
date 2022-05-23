import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { HiOutlineUser } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { signIn } from "next-auth/react"

const UserAuth = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) =>
    signIn("credentials", {
      redirect: false,
      username: watch("Username"),
      password: watch("Password"),
      callbackUrl: "/"
    })

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        <HiOutlineUser />
      </button>
      {showModal ? (
        <div
          onClick={() => setShowModal(false)}
          className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-screen bg-gradient-to-br from-gray-200/20 to-gray-300/20 backdrop-blur-sm w-100"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-center items-center flex-col p-5 space-y-6 bg-white shadow-lg rounded-lg text-center"
          >
            <span
              className="before:block before:absolute before:-inset-0 before:-mx-1 
            before:-skew-y-3 before:bg-red-400 relative py-2 cursor-pointer flex justify-center items-center"
            >
              <span className="font-black text-white relative italic text-sm">
                HappyFeet
              </span>
            </span>
            <span
              className="flex justify-center w-full items-center text-center text-lg before:content-[''] before:bg-black before:inline-block before:h-0.5 before:relative before:align-middle before:w-24 before:-ml-2/4 before:right-2
           after:content-[''] after:bg-black after:inline-block after:h-0.5 after:relative after:align-middle after:w-24 before:-ml-2/4 after:left-2
            "
            >
              Login
            </span>
            <form
              className="flex w-full flex-col justify-center items-center space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className={`block text-base py-2 px-3 w-full rounded-xl border transition-all duration-500 ease-in-out outline-red-100 ${
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
                className={`block text-base py-2 px-3 w-full rounded-xl border transition-all duration-500 ease-in-out outline-red-100 ${
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
              <button
                className="p-1 px-4 rounded-xl text-base border bg-red-300 text-white hover:bg-red-400 active:bg-red-500 transition-colors duration-200 ease-in"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default UserAuth
