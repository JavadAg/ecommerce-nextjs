import axios from "axios"
import "../styles/globals.css"
import "@fontsource/quicksand"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import store from "../redux/store"
import { PersistGate } from "redux-persist/integration/react"
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"

let persistor = persistStore(store)

function MyApp({ Component, pageProps, appProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SessionProvider>
          <Header />
          <div className="bg-gray-50">
            <Component {...pageProps} appProps={appProps} />
          </div>
          <Footer />
        </SessionProvider>
      </PersistGate>
    </Provider>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/data`)
  const data = res.data.products
  return { appProps: data.reverse() }
}
export default MyApp
