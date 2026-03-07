import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <Link to="jobs"><li>Jobs</li></Link>
        <li>Admin Dashboard</li>
        <li>Applicant Dashboard</li>
        <li>Employer Dashboard</li>
        <Link to="/login"><li>Login</li></Link>
        <Link to="/register"><li>Register</li></Link>
      </ul>
    </div>
  )
}

export default Navbar
