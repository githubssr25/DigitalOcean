import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
// import "./Login.css"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {

  console.log("Rendering Login component");
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        console.log("Storing user in localStorage:", user);


        //It adds an item to the browser’s localStorage.
// The key is "learning_user", and the value is a stringified object 
//containing the user ID.
///whenever a user successfully logs in (i.e., foundUsers.length === 1),
// the learning_user data is saved to localStorage
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">Learning Moments</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => setEmail(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}

