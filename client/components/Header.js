import axios from 'axios'
import {useRouter} from 'next/router'
const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const router = useRouter()

  const signoutHandler = async () => {
    await axios.post("/api/users/signout", {})
    setIsLoggedIn(false)
    router.push("/")

  }


  return (
    <div className="container-fluid p-3 border-bottom border-primary">
      <div className="d-flex">
        <button onClick={() => router.push("/")} className="btn-primary mx-3">
          Home
        </button>
        {!isLoggedIn && (
          <>
            <button
              onClick={() => router.push("/auth/signin")}
              className="btn-primary mx-3"
            >
              Sginin
            </button>
            <button
              className="btn-primary mx-3"
              onClick={() => router.push("/auth/signup")}
            >
              Signup
            </button>
          </>
        )}
        {isLoggedIn && (
        <button onClick={signoutHandler} >
          Signout
        </button>
        )}
      </div>
    </div>
  )
}

export default Header

