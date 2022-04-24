import axios from "axios"
import "../styles/globals.css"
import App from "next/app"
import store from "../redux/store"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Head from "next/head"

let persistor = persistStore(store)

function MyApp({ Component, appProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Ecommerce</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        <Component appProps={appProps} />
        <Footer />
      </PersistGate>
    </Provider>
  )
}

MyApp.getInitialProps = async ({ ctx }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/data`)
  const data = await res.data
  console.log(data)
  return { appProps: data.data.reverse() }
}
export default MyApp
