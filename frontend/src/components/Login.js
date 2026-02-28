import React from 'react';
import '../css/Auth.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    const resJson = await response.json();
    if (!response.ok) {
      setError(resJson.message);
    } else {
      setError("");
      navigate("/jobs")
    }
  };
    return (
    <>
      {error && <span className="error-msg">{"Error: " + error}</span>}
      <div className="auth-div">     
        <form method="post" className="auth-form">
          <h2>Login</h2>
          <p>Lets get back to work</p>
          <div>
            <input className="auth-input-box" type="text" id="username" name="username" placeholder="Username" aria-label="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          
          <div>
            <input className="auth-input-box" type="password" id="password" name="password" placeholder="Password" aria-label="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          
          <button type="submit" onClick={(e) => submitLogin(e)}>Log In</button>
          <p id="has-account">Not a member? <Link id="has-account-redirect" to="/register">Sign up</Link> today</p>
        </form>
      </div>
    </>
  );
}
export default Login;