import React from 'react'

const Register = () => {
  return (
    <div>
        <h2>Register</h2>
        <form>

        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" placeholder = "Enter Username"/>
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" name="email" placeholder = "Enter Email"/>
        </div>

        <div>
          <label>Password: </label>
          <input type="password" id="password" name="password" placeholder = "Enter Password"/>
        </div>

        <button type="submit">Register</button>
        </form>

    </div>
    
  )
}

export default Register