import React from 'react';
import { Link } from 'react-router-dom'

export default function Exercise ({ exercise, deleteExercise }) {

  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0,10)}</td>
      <td>
        <button>
          <Link to={`/edit/${exercise._id}`}>
            Edit
          </Link>
        </button>
        |
        <button onClick={() => {deleteExercise(exercise._id)}}>
          Delete
        </button>
      </td>
    </tr>
  )
}
