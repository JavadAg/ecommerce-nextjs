import React from "react"

const AccountDetails = ({ data }) => {
  return (
    <div className="flex justify-center items-start flex-col w-11/12 bg-white my-4 border border-gray-300 rounded-2xl shadow-sm divide-y text-sm sm:w-7/12 sm:my-0 sm:font-bold sm:p-4 sm:space-y-2">
      <div className="p-2 w-full items-center flex justify-start ">
        <span className="text-gray-700">Username : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50">
          {data.username}
        </span>
      </div>
      <div className="p-2 w-full items-center flex justify-start">
        <span className="text-gray-700">Email : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50">
          {data.email}
        </span>
      </div>
      <div className="p-2 w-full items-center flex justify-start">
        <span className="text-gray-700 ">Firstname : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50">
          {data.firstname}
        </span>
      </div>
      <div className="p-2 w-full items-center flex justify-start">
        <span className="text-gray-700">Lastname : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50">
          {data.lastname}
        </span>
      </div>
      <div className="p-2 w-full items-center flex justify-start">
        <span className="text-gray-700">Created At : </span>
        <span className="text-red-400 ml-2 px-2 rounded-md bg-gray-50">
          {data.createdAt}
        </span>
      </div>
    </div>
  )
}

export default AccountDetails
