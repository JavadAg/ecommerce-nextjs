import React from "react"
import ProductDetails from "../../components/Product/ProductDetails/ProductDetails"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"
import { gql } from "graphql-request"
import { request } from "../../lib/graphcms"

const productdetails = ({ product }) => {
  return (
    <div>
      <Breadcrumb />
      <ProductDetails data={product} />
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { slug } = params

  const query = gql`
    query {
      product(where: { slug: "${slug}"  }) {
        slug
        id
        name
        brand
        category
        price
        discountprice
        sold
        img {
          url
        }
        sizes
      }
    }
  `

  const { product } = await request({
    query: query
  })

  return {
    props: { product }
  }
}

export default productdetails
