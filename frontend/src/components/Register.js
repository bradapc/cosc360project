import React from 'react'
import '../css/Auth.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="auth-div">
        <form method="post" className="auth-form">
          <h2>Sign up</h2>
          <p>Lets find a job right for you</p>
          <div>
            <input className="auth-input-box" type="text" placeholder = "Username" aria-label="username"/>
          </div>

          <div>
            <input className="auth-input-box" type="text" id="email" name="email" placeholder = "Email" aria-label="email"/>
          </div>

          <div>
            <input className="auth-input-box" type="password" id="password" name="password" placeholder = "Password" aria-label="password"/>
          </div>

          <button type="submit">Register</button>
          <p id="has-account">Already have an account? <Link id="has-account-redirect" to="/login">Sign in</Link> instead</p>
        </form>

    </div>
    
  )
}

export default Register