import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  
  let [serverMessage, setServerMessage] = useState('')

  const callServer = () => {
    let token = localStorage.getItem('userToken')
   
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/profile`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => {
    
      response.json().then(result => {
        if (response.ok) {
         
          setServerMessage(result.message)
        } else {
    
          setServerMessage('No secret message')
        }
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  if(!props.user){
    return <Redirect to="/"/>
  }
  
  return (
    <div>
      <h2>{props.user.firstname}'s Profile</h2>
      <h3>{props.user.firstname} {props.user.lastname}</h3>
      <img alt="profile" src={props.user.profileUrl} />
      <p> Email: {props.user.email}</p>
      <button onClick={callServer}>Call /profile route on server</button>
      <p>{serverMessage}</p>
    </div>
  )
}

export default Profile
