import React, { useEffect, useState } from 'react';
import axios from "axios";
import Exercise from '../Exercise/Exercise';

const ExercisesList = (props) => {

  const [exercises, setExercises] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/exercises')
      .then((response) => {
        if (response.data.length > 0) {
          setExercises(response.data)
        }
      })
      .catch((error) => {
        console.log(error);
      });  
    // return () => {
    //   second
    // }
  }, [])
  
  
  const deleteExercise = (id) => {
    axios.delete(`http://localhost:5000/exercises/${id}`)
      .then((response) => {
        console.log(response.data)
        const updatedExercises = exercises.filter(el => el._id !== id)
        setExercises(updatedExercises)
      })
      .catch((error) => {
        console.log(error);
      }); 
  }

  const exercisesList = () => {
    return (
      exercises.map(currentExercise => {
        return <Exercise exercise={currentExercise} deleteExercise={deleteExercise} key={currentExercise._id} /> 
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
    </div>
  )
};

ExercisesList.propTypes = {};

ExercisesList.defaultProps = {};

export default ExercisesList;
