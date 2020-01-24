// Packages
import React, { useState, useEffect } from 'react'
import { Redirect} from 'react-router-dom'

const Login = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  // update error message whenever something else is typed (i.e. clear error message when they go in to fix it)
  useEffect(() => {
    setMessage('')
  }, [email, password])

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault()
    // Fetch call to POST data
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { //make sure to use server's full address since this will be on a different port
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      
      response.json()
      .then(result => {
        console.log('Response', response) // meta data/status text
        console.log('Result', result) // data in the send
        if(response.ok) {
          //update the user's token
          props.updateUser(result.token)
        } else {
          setMessage(`${response.status} ${response.statusText}: ${result.message}`)
        }
      })
      .catch(err => {
        console.log(err)
        setMessage(`${err.toString()}`)
      })

    })
    .catch(err => {
      console.log(err)
      setMessage(`${err.toString()}`)
    })
  }

  //If user exists, redirect to profile page
  if (props.user) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <h2>Login</h2>
      <span className="red">{message}</span>
      <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Beam Me Up!</button>
        </form>
    </div>
  )
}

export default Login
