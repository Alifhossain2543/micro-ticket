import "bootstrap/dist/css/bootstrap.min.css"
import Header from "../components/Header"
import {useState} from 'react'

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    pageProps?.data?.currentUser != null
  )

  
  
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Component {...pageProps} />
    </>
  )
}

export default MyApp

