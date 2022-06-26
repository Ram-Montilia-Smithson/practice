import React, { useState } from 'react';
import axios from "axios"

export default function CreateUser() {
  
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/users/add', { username })
      .then((response) => setMessage(response.data))
      .catch((error) => error.response.data ? setMessage(error.response.data) : setMessage(error.message));
  }
  
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>UserName: </label>
          <input
            type="text"
            required
            className='form-control'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setMessage("")}
          />
        </div>
        <div className='mt-3'>
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
      <h3 className='mt-3'>{message}</h3>
    </div>
  )
};
