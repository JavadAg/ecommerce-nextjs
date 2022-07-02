import React from "react"

const AccountDetails = ({ data }) => {
  return (
    <div className="flex justify-center items-start flex-col w-11/12 bg-white dark:bg-zinc-800  my-4 border border-gray-300 dark:border-zinc-700 rounded-2xl shadow-sm divide-y text-sm sm:w-7/12 sm:my-0 sm:font-bold sm:p-4 sm:space-y-2">
      <div className="p-2 w-full items-center flex justify-start ">
        <span className="text-gray-700 dark:text-zinc-300">Username : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50 dark:bg-zinc-700 ">
          {data.username}
        </span>
      </div>
      <div className="p-2 w-full items-center flex justify-start">
        <span className="text-gray-700 dark:text-zinc-300">Email : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50 dark:bg-zinc-700 ">
          {data.email}
        </span>
      </div>
      <div className="p-2 w-full items-center flex justify-start">
        <span className="text-gray-700 dark:text-zinc-300">Firstname : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50 dark:bg-zinc-700 ">
          {data.firstname}
        </span>
      </div>
      <div className="p-2 w-full items-center flex justify-start">
        <span className="text-gray-700 dark:text-zinc-300">Lastname : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50 dark:bg-zinc-700 ">
          {data.lastname}
        </span>
      </div>
      <div className="p-2 w-full items-center flex justify-start">
        <span className="text-gray-700 dark:text-zinc-300">Created At : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50 dark:bg-zinc-700 ">
          {data.createdAt}
        </span>
      </div>
    </div>
  )
}

export default AccountDetails
