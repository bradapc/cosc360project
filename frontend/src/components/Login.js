import React from 'react';
import '../css/Auth.css'
import { Link } from 'react-router-dom';

function Login(){
    return (
    <div className="auth-div">     
      <form method="post" className="auth-form">
        <h2>Login</h2>
        <p>Lets get back to work</p>
        <div>
          <input className="auth-input-box" type="text" id="username" name="username" placeholder="Username" aria-label="username"/>
        </div>
        
        <div>
          <input className="auth-input-box" type="password" id="password" name="password" placeholder="Password" aria-label="password"/>
        </div>
        
        <button type="submit">Log In</button>
        <p id="has-account">Not a member? <Link id="has-account-redirect" to="/register">Sign up</Link> today</p>
      </form>
    </div>
  );
}
export default Login;