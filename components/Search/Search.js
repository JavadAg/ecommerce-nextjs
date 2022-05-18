import { useCallback, useRef, useState } from "react"
import Link from "next/link"
import { HiSearch } from "react-icons/hi"
import axios from "axios"

export default function Search() {
  const searchRef = useRef(null)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(false)
  const [results, setResults] = useState([])

  const searchEndpoint = (query) =>
    `${process.env.NEXT_PUBLIC_URL}/api/search?q=${query}`

  const onChange = async (e) => {
    const query = e.target.value
    setQuery(query)
    if (query.length) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/search?q=${query}`
      )
      const data = await res.data

      setResults(data)
    } else {
      setResults([])
    }
  }
  const onFocus = useCallback(() => {
    setActive(true)
    window.addEventListener("click", onClick)
  }, [])
  const [showModal, setShowModal] = useState(false)

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener("click", onClick)
    }
  }, [])

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        <HiSearch />
      </button>
      {showModal ? (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-auto my-6 mx-auto max-w-3xl"
            >
              <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div ref={searchRef}>
                  <input
                    onChange={onChange}
                    onFocus={onFocus}
                    placeholder="Search posts"
                    type="text"
                    value={query}
                  />
                  {active && results.length > 0 && (
                    <ul className="flex absolute justify-center items-center flex-col h-36 w-80 z-40 bg-neutral-200">
                      {results.map((item) => (
                        <li key={item.id}>
                          <Link href="/shop/[id]" as={`/shop/${item.id}`}>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* <button>
        
      </button>
     */}
    </>
  )
}
