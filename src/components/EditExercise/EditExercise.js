import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";

export default function EditExercise(){ 

  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [date, setDate] = useState(new Date())
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState("")
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/'+id)
      .then((response) => {
        setUsername(response.data.username)
        setDescription(response.data.description)
        setDuration(response.data.duration)
        setDate(new Date(response.data.date))
      })
      .catch((error) => setMessage(error.message));
    
    axios.get('http://localhost:5000/users')
      .then((response) => response.data.length && setUsers(response.data.map(user => user.username)))
      .catch((error) => setMessage(error.message));
  }, [id])

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date,
    }

    axios.post('http://localhost:5000/exercises/update/'+id, exercise)
      .then((response) => {
        setMessage(response.data)
        window.location = '/'
      })
      .catch((error) => setMessage(error));
  }
  
  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>UserName: </label>
          <select
            required
            className='form-control'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setMessage("")}
          >
            {users.map((user) => <option key={user} value={user}>{user}</option>)}
          </select>
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type="text"
            required
            className='form-control'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setMessage("")}
          />
        </div>
        <div className='form-group'>
          <label>Duration (In Minutes): </label>
          <input
            type="text"
            required
            className='form-control'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            onFocus={() => setMessage("")}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            onFocus={() => setMessage("")}
          />
        </div>
        <div className='mt-3'>
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
      <h3 className='mt-3'>{message}</h3>
    </div>
  )
};
