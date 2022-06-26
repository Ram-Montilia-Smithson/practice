import React, { useEffect, useState } from 'react';
import axios from "axios";
import Exercise from '../Exercise/Exercise';

export default function ExercisesList() {

  const [exercises, setExercises] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/exercises')
      .then((response) => response.data.length && setExercises(response.data))
      .catch((error) => setMessage(error.message));
    eraseMessage()
  }, [])
  
  
  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then((response) => {
        setMessage(response.data)
        const updatedExercises = exercises.filter(el => el._id !== id)
        setExercises(updatedExercises)
      })
      .catch((error) => setMessage(error.message));
    eraseMessage()
  }

  const eraseMessage = () => setTimeout(() => setMessage(""), 10000);

  const exercisesList = () => {
    return (
      exercises.map(currentExercise => {
        return (
          <Exercise
            exercise={currentExercise}
            deleteExercise={deleteExercise}
            key={currentExercise._id}
          /> 
        )
      })
    )
  }

  return (
    <div>
      <h3>Logged exercises</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>UserName</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercisesList()}
        </tbody>
      </table>
      <h3 className='mt-3'>{message}</h3>
    </div>
  )
};