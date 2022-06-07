import "../styles/globals.css"
import "@fontsource/quicksand"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { gql } from "graphql-request"
import { request } from "../lib/graphcms"
import { SessionProvider } from "next-auth/react"
import { ShopProvider } from "../utils/context"
import NextNProgress from "nextjs-progressbar"

function MyApp({ Component, pageProps, appProps }) {
  return (
    <ShopProvider>
      <NextNProgress showOnShallow={true} color="#F87171" height={3} />
      <SessionProvider>
        <Header />
        <div className="bg-gray-50">
          <Component {...pageProps} appProps={appProps} />
        </div>
        <Footer />
      </SessionProvider>
    </ShopProvider>
  )
}

const query = gql`
  {
    products(orderBy: createdAt_DESC) {
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

MyApp.getInitialProps = async (ctx) => {
  const { products } = await request({
    query: query
  })

  return { appProps: products }
}

export default MyApp
