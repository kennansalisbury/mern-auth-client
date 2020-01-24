// Packages
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

const Signup = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')
  let [profileUrl, setProfileUrl] = useState('')

  // update error message whenever something else is typed (i.e. clear error message when they go in to fix it)
  useEffect(() => {
    setMessage('')
  }, [firstname, lastname, email, password, profileUrl])

  const handleSubmit = e => {
    // prevent default of form submission
    e.preventDefault()

    //form the data object
    let data = {
      email,
      firstname,
      lastname,
      password,
      profileUrl
    }    

    //send user sign up data to the server
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      response.json().then(result => { //will include error message if error, or token if successful
        if (response.ok) { //.ok is built in property to response that means the response is an ok response (200s)
          //update user info
          props.updateUser(result.token)
        } else {
          //status was something other than 200s
          setMessage(`${response.status} ${response.statusText}: ${result.message}`)
        }
      })
    })
    .catch(err => {
      console.log(err)
      setMessage(`${err.toString}`)
    })
  }

  // redirect to profile when user logged in
  if(props.user) {
    return <Redirect to="/profile"/>
  }


  return (
    <div>
      <h2>Signup</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input name="firstname" placeholder="Your first name" onChange={e => setFirstname(e.target.value)} />
        </div>
        <div>
          <label>Last Name:</label>
          <input name="lastname" placeholder="Your last name" onChange={e => setLastname(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Profile Pic URL:</label>
          <input type="url" name="profileUrl" onChange={e => setProfileUrl(e.target.value)} />
        </div>
        <button type="submit">Sign Me Up!</button>
      </form>
    </div>
  )
}

export default Signup
