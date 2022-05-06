import axios from "axios"
import React, { useState } from "react"
import ProductDetails from "../../components/Products/Product/ProductDetails"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"

const productdetails = ({ postDetails }) => {
  return (
    <div>
      <Breadcrumb />
      <ProductDetails data={postDetails} />
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/data?id=${params.id}`
  )
  const data = await res.data
  const postDetails = Object.assign({}, ...data)
  return {
    props: { postDetails }
  }
}

//gives error on vercel deploy

/* export const getStaticPaths = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/data`)

  const data = await res.data

  const paths = data.map((item) => ({
    params: {
      id: item.id.toString()
    }
  }))

  return {
    paths,
    fallback: "blocking"
  }
}
 */
export default productdetails
