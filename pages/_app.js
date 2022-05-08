import axios from "axios"
import "../styles/globals.css"
import store from "../redux/store"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import "@fontsource/quicksand"

let persistor = persistStore(store)

function MyApp({ Component, pageProps, appProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <Component {...pageProps} appProps={appProps} />
        <Footer />
      </PersistGate>
    </Provider>
  )
}

MyApp.getInitialProps = async (ctx) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/data`)

  const data = res.data
  return { appProps: data.reverse() }
}
export default MyApp
