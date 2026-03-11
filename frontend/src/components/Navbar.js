import React from 'react'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'

const Navbar = () => {
  const { user, loading } = useAuth();
  console.log(user);
  return (
    <div className="navbar">
      <ul>
        <Link to="jobs"><li>Jobs</li></Link>
        <li>Admin Dashboard</li>
        <li>Applicant Dashboard</li>
        <li>Employer Dashboard</li>
        <Link to="/login"><li>Login</li></Link>
        <Link to="/register"><li>Register</li></Link>
        <Link to={`/users/${user?.userId}`}><li>My Profile</li></Link>
      </ul>
    </div>
  )
}

export default Navbar
