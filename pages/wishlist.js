import axios from "axios"
import React from "react"
import WishList from "../components/WishList/WishList"
import { getSession } from "next-auth/react"

const wishlist = ({ data }) => {
  return <WishList data={data} />
}

export default wishlist

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  const { id } = session
  if (session) {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/wishlist?id=${id}`
    )

    const data = res.data
    return {
      props: { data }
    }
  }
}
