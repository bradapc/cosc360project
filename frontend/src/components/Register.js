import React from 'react'
import '../css/Auth.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [username, setUsername] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitRegister = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        dateOfBirth,
        username,
        emailAddress,
        password,
        confirmPassword
      })
    })
  };

  return (
    <div className="auth-div">
        <form method="post" className="auth-form">
          <h2>Sign up</h2>
          <p>Lets find a job right for you</p>

          <div>
            <input className="auth-input-box" type="text" placeholder = "First Name" aria-label="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          </div>

          <div>
            <input className="auth-input-box" type="text" placeholder = "Last Name" aria-label="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          </div>

          <div id="dob">
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/festival-culture-religion/birthday-icon.png" />
            <input className="auth-input-box" type="date" id="bday" name="bday" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
          </div>

          <div>
            <input className="auth-input-box" type="text" placeholder = "Username" aria-label="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>

          <div>
            <input className="auth-input-box" type="text" id="email" name="email" placeholder = "Email" aria-label="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
          </div>

          <div>
            <input className="auth-input-box" type="password" id="password" name="password" placeholder = "Password" aria-label="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div>
            <input className="auth-input-box" type="password" id="confirm-password" name="confirm-password" placeholder="Confirm Password" aria-label="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>

          <button type="submit" aria-label="register-button" onClick={(e) => submitRegister(e)}>Register</button>
          <p id="has-account">Already have an account? <Link id="has-account-redirect" to="/login">Sign in</Link> instead</p>
        </form>

    </div>
    
  )
}

export default Register