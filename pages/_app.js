import "../styles/globals.css"
import "@fontsource/quicksand"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { gql } from "graphql-request"
import { request } from "../lib/graphcms"
import { getSession, SessionProvider } from "next-auth/react"
import { ShopProvider } from "../utils/cartcontext"
import NextNProgress from "nextjs-progressbar"
import { ThemeProvider } from "next-themes"

function MyApp({ Component, pageProps, appProps }) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>
        <ShopProvider>
          <NextNProgress showOnShallow={true} color="#F87171" height={3} />
          <Header />
          <div className="bg-gray-50 dark:bg-zinc-900">
            <Component {...pageProps} appProps={appProps} />
          </div>
          <Footer />
        </ShopProvider>
      </SessionProvider>
    </ThemeProvider>
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
  const session = await getSession(ctx)
  let userWishlist = ""

  if (session) {
    const query = gql`
  query MyQuery {
    nextUser(where: {id: "${session?.user.id}"}) {
      id
      wishlist
    }
  }
  `

    let { nextUser } = await request({
      query: query
    })
    console.log(nextUser.wishlist.length)
    userWishlist = nextUser.wishlist
  }

  const { products } = await request({
    query: query
  })

  return { appProps: { products: products, userWishlist: userWishlist } }
}

export default MyApp
