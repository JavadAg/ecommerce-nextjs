import { useCallback, useRef, useState, useEffect } from "react"
import Link from "next/link"
import { HiSearch } from "react-icons/hi"
import { gql } from "graphql-request"
import { request } from "../../lib/graphcms"

export default function Search() {
  const searchRef = useRef(null)
  const [results, setResults] = useState([])
  const [showModal, setShowModal] = useState(false)

  //search query
  const onChange = async (e) => {
    const query = gql`
      query MyQuery {
        products(
          where: { OR: [{ brand_contains: "${e.target.value}" }, { name_contains: "${e.target.value}" }] }
        ) {
          id
          slug
          name
        }
      }
    `
    if (e.target.value) {
      let { products } = await request({
        query: query
      })

      setResults(products)
    }
  }

  //reset results state if modal closed
  useEffect(() => {
    showModal === false && setResults([])
  }, [showModal])

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      window.removeEventListener("click", onClick)
    }
  }, [])

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        <HiSearch className="dark:text-zinc-800" />
      </button>
      {showModal ? (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute w-auto my-6 mx-auto max-w-3xl top-24"
            >
              <div ref={searchRef} className="relative">
                <input
                  className="border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 h-10 px-5 pr-16 rounded-2xl text-sm focus:outline-none"
                  onChange={onChange}
                  placeholder="Search"
                  type="text"
                />
                {results.length > 0 && (
                  <ul className="flex absolute justify-center items-center text-center flex-col z-40 text-base space-y-4 w-full text-gray-800 dark:text-zinc-200 top-14 font-bold ">
                    {results.map((item) => (
                      <li
                        className="hover:text-gray-700 dark:hover:text-zinc-700"
                        key={item.id}
                      >
                        <Link href="/shop/[id]" as={`/shop/${item.slug}`}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
