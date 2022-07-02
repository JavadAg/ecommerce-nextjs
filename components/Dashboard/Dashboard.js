import { Fragment, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import {
  HiOutlineChevronDown,
  HiOutlineCheck,
  HiOutlineUser,
  HiOutlineClipboardList,
  HiOutlineHeart
} from "react-icons/hi"
import Orders from "./Orders/Orders"
import AccountDetails from "./AccountDetails/AccountDetails"
import Wishlist from "./Wishlist/Wishlist"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const menu = [
  {
    id: 1,
    icon: <HiOutlineUser />,
    name: "Account Details"
  },
  {
    id: 2,
    icon: <HiOutlineClipboardList />,
    name: "Orders"
  },
  {
    id: 3,
    icon: <HiOutlineHeart />,
    name: "Wishlist"
  }
]

const Dashboard = ({ data }) => {
  const [selected, setSelected] = useState(menu[0])

  return (
    <div className="flex justify-center items-center text-center">
      <div className="flex justify-center items-center text-center mt-16 flex-col w-full sm:flex-row sm:items-start sm:my-20 sm:justify-between sm:mx-4">
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <div className="relative w-11/12 sm:hidden">
                <Listbox.Button className="relative w-full bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-red-300 sm:text-sm">
                  <span className="flex items-center">
                    <i>{selected.icon}</i>
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <HiOutlineChevronDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-zinc-800  shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {menu.map((item, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-red-300"
                              : "text-gray-900 dark:text-zinc-300",
                            "cursor-default select-none relative py-2 pl-3 pr-9"
                          )
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <i>{item.icon}</i>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {item.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active
                                    ? "text-white dark:text-zinc-300"
                                    : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <HiOutlineCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>

              <div className="hidden sm:flex justify-center items-start flex-col z-10 bg-white dark:bg-zinc-800  max-h-56 rounded-2xl py-1 text-base overflow-auto focus:outline-none sm:text-sm border border-gray-300 w-4/12">
                {menu.map((item, index) => (
                  <Listbox.Option
                    onClick={setSelected}
                    key={index}
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "text-white bg-red-300 w-full"
                          : "text-gray-900",
                        "cursor-default select-none  relative py-2 pl-3 pr-9 list-none"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <i>{item.icon}</i>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {item.name}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </div>
            </>
          )}
        </Listbox>
        {selected.id === 1 && <AccountDetails data={data} />}
        {selected.id === 2 && <Orders orders={data.orders} />}
        {selected.id === 3 && <Wishlist wishlist={data.wishlist} />}
      </div>
    </div>
  )
}

export default Dashboard
