import { GraphQLClient } from "graphql-request"
export function request({ query, variables, preview }) {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_API}`,
      ContentType: "application/graphql"
    }
  })
  return client.request(query, variables)
}
