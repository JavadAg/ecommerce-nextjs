import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { HiUser, HiOutlineUser } from "react-icons/hi"
import { signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"

const UserAuth = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [sign, setSign] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()

  const signhandler = () => {
    setError(false)
    setSign(!sign)
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  //Nextauth form
  const onSubmit = () => {
    setIsSubmitting(true)
    signIn("credentials", {
      redirect: false,
      username: watch("Username"),
      password: watch("Password"),
      firstname: watch("Firstname"),
      lastname: watch("Lastname"),
      email: watch("Email"),
      callbackUrl: "/",
      sign
    }).then((res) => {
      if (res.ok) {
        setShowModal(false)
        setIsSubmitting(false)
      } else {
        setError(true)
        setIsSubmitting(false)
      }
    })
  }

  return (
    <>
      <button
        className={`duration-300 sm:hidden ${
          router.pathname === "/dashboard"
            ? " text-red-400 drop-shadow-[0px_0px_5px_#F87171]"
            : ""
        }`}
        onClick={() =>
          session ? router.push("/dashboard") : setShowModal(true)
        }
      >
        <HiUser />
      </button>
      <div className="flex justify-center items-center group relative">
        <button
          className="hidden sm:block relative"
          onClick={() =>
            session ? router.push("/dashboard") : setShowModal(true)
          }
        >
          <HiOutlineUser />
        </button>
        {session && (
          <div className="w-0 flex group-hover:w-16 overflow-hidden justify-center items-center bg-red-400 rounded-md absolute duration-200 top-9">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-400 rounded-2xl text-center text-sm px-3 py-2 text-white font-bold"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {showModal ? (
        <div
          onClick={() => setShowModal(false)}
          className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-screen bg-gradient-to-br from-gray-200/20 to-gray-300/20 backdrop-blur-sm w-full"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex justify-center items-center flex-col p-5 space-y-4 bg-white shadow-lg rounded-lg text-center w-80"
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
              className="flex justify-center w-full items-center text-center text-lg before:content-[''] before:bg-black before:inline-block before:h-0.5 before:relative before:align-middle before:w-16 before:-ml-2/4 before:right-2
           after:content-[''] after:bg-black after:inline-block after:h-0.5 after:relative after:align-middle after:w-16 before:-ml-2/4 after:left-2
            "
            >
              {sign ? "Register" : "Login"}
            </span>
            <form
              className="flex w-full flex-col justify-center items-center space-y-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className={`block text-sm py-2 px-3 w-full rounded-md border transition-all duration-500 ease-in-out outline-red-100 ${
                  errors.Username &&
                  "border-l-8 border bg-red-100/20 border-red-400"
                }`}
                type="text"
                placeholder="Username"
                {...register("Username", { required: true })}
              />
              {errors.Username?.type === "required" && (
                <p className="font-semibold text-red-400 text-xs">
                  Username is required !
                </p>
              )}
              <input
                className={`block text-sm py-2 px-3 w-full rounded-md border transition-all duration-500 ease-in-out outline-red-100 ${
                  errors.Password &&
                  "border-l-8 border bg-red-100/20 border-red-400"
                }`}
                type="password"
                placeholder="Password"
                {...register("Password", {
                  required: true,
                  min: 8
                })}
              />
              {errors.Password?.type === "required" && (
                <p className="font-semibold text-red-400 text-xs">
                  Password is required !
                </p>
              )}

              {sign && (
                <>
                  <div className="flex w-full  justify-center items-center space-x-2">
                    <div className="flex w-full  justify-center flex-col items-center space-y-3">
                      <input
                        className={`block text-sm py-2 px-3 w-full rounded-md border transition-all duration-500 ease-in-out outline-red-100 ${
                          errors.Firstname &&
                          "border-l-8 border bg-red-100/20 border-red-400"
                        }`}
                        type="text"
                        placeholder="Firstname"
                        {...register("Firstname", { required: true })}
                      />
                      {errors.Firstname?.type === "required" && (
                        <p className="font-semibold text-red-400 text-xs">
                          Firstname is required !
                        </p>
                      )}
                    </div>
                    <div className="flex w-full  justify-center flex-col items-center space-y-3">
                      <input
                        className={`block text-sm py-2 px-3 w-full rounded-md border transition-all duration-500 ease-in-out outline-red-100 ${
                          errors.Lastname &&
                          "border-l-8 border bg-red-100/20 border-red-400"
                        }`}
                        type="text"
                        placeholder="Lastname"
                        {...register("Lastname", { required: true })}
                      />
                      {errors.Lastname?.type === "required" && (
                        <p className="font-semibold text-red-400 text-xs">
                          Lastname is required !
                        </p>
                      )}
                    </div>
                  </div>
                  <input
                    className={`block text-sm py-2 px-3 w-full rounded-md border transition-all duration-500 ease-in-out outline-red-100 ${
                      errors.Email &&
                      "border-l-8 border bg-red-100/20 border-red-400"
                    }`}
                    type="email"
                    placeholder="Email"
                    {...register("Email", { required: true })}
                  />
                  {errors.Email?.type === "required" && (
                    <p className="font-semibold text-red-400 text-xs">
                      Email is required !
                    </p>
                  )}
                </>
              )}
              {error && !sign ? (
                <span className="font-semibold text-red-400 text-xs">
                  Invalid username or password
                </span>
              ) : error && sign ? (
                <span className="font-semibold text-red-400 text-xs">
                  User already exists
                </span>
              ) : (
                ""
              )}
              <button
                className="p-1 px-4 rounded-md text-base text-gray-500 font-semibold hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 transition-colors duration-200 ease-in disabled:text-opacity-20 disabled:cursor-wait"
                type="submit"
                disabled={isSubmitting === true}
              >
                {sign ? "Register" : "Login"}
              </button>
            </form>
            <span
              className="underline underline-offset-4 text-gray-600 text-sm"
              onClick={signhandler}
            >
              {sign
                ? "Already have an account? Sign in"
                : "Dont have an account ? Sign up"}
            </span>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default UserAuth
