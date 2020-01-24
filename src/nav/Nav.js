import React from 'react'
import { Link } from 'react-router-dom'

const Nav = props => {
  const handleLogout = e => {
    e.preventDefault()
    // Remove the token from localstorage (or cookies)
    localStorage.removeItem('userToken')
    // Update the state of the App
    props.updateUser(null)
  }

  let links = (
    <span>
      <li>
          <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
      </li>
    </span>
  )

  // If the user is logged in, show profile page and logout links
    if(props.user) {
      links = (
        <span>
          <li>Hi, {props.user.firstname}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="#" onClick={handleLogout}>Logout</Link>
          </li>
        </span>
      )
    }


  return (
    <nav>
      <ul>
        {links}
      </ul>
    </nav>
  )
}

export default Nav
