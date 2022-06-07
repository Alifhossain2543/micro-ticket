import React, { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const signupHandler = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      })
      router.push("/")
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <h1>Signin form</h1>
      <form onSubmit={signupHandler}>
        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn-primary">
            Signin
          </button>
        </div>
      </form>
    </>
  )
}

export default Signin
