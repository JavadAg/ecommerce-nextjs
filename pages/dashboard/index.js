import React from "react"
import Dashboard from "../../components/Dashboard/Dashboard"
import { getSession } from "next-auth/react"
import { gql } from "graphql-request"
import { request } from "../../lib/graphcms"

const index = ({ data }) => {
  return <Dashboard data={data} />
}

export default index

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  const query = gql`
    query MyQuery {
      nextUser(where: { id: "${session.user.id}" }) {
        createdAt
        email
        firstname
        lastname
        username
        wishlist
        orders {
          createdAt
          img
          name
          quantity
        }
      }
    }
  `

  const { nextUser } = await request({ query: query })

  const data = nextUser

  return {
    props: { data }
  }
}
