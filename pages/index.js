import React from "react"
import Hero from "../components/Hero/Hero"
import Categories from "../components/Categories/Categories"
import ProductsTab from "../components/ProductsTab/ProductsTab"
import Partners from "../components/Partners/Partners"
import FromtheBlog from "../components/FromtheBlog/FromtheBlog"
import { gql } from "graphql-request"
import { request } from "../lib/graphcms"

export default function Home({ appProps, blogPosts }) {
  return (
    <>
      <div>
        <Hero />
        <ProductsTab products={appProps} />
        <Categories data={appProps} />
        <FromtheBlog posts={blogPosts} />
        <Partners />
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const query = gql`
    query MyQuery {
      blogPosts {
        id
        img {
          url
        }
        text
        title
        createdAt
        author
      }
    }
  `

  const { blogPosts } = await request({ query: query })

  return {
    props: { blogPosts }
  }
}
