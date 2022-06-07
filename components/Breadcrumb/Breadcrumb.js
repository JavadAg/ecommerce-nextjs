import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { HiHome, HiOutlineChevronRight } from "react-icons/hi"

const convertBreadcrumb = (string) => {
  return string
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
}

const Breadcrumb = () => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState(null)

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/")
      linkPath.shift()

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/")
        }
      })

      setBreadcrumbs(pathArray)
    }
  }, [router])

  if (!breadcrumbs) {
    return null
  }

  return (
    <div className="flex text-sm font-semibold px-2 md:px-10 w-full xl:px-36">
      <div className="mt-16 w-full flex">
        <div>
          <nav
            className="flex py-3 px-5 text-gray-700 bg-white rounded-xl border border-gray-200"
            aria-label="Breadcrumb"
          >
            <ul className="flex items-center space-x-1 md:space-x-3">
              <HiHome />
              <li className="inline-flex items-center cursor-pointer">
                <Link
                  href="/"
                  className="inline-flex items-center text-gray-700 hover:text-gray-900"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((breadcrumb, i) => {
                return (
                  <li
                    className="flex capitalize space-x-2 items-center justify-center"
                    key={breadcrumb.href}
                  >
                    <HiOutlineChevronRight />
                    <Link href={breadcrumb.href}>
                      {convertBreadcrumb(breadcrumb.breadcrumb)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
