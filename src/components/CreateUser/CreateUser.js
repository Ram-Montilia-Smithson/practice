import React, { useState } from 'react';
import axios from "axios"

const CreateUser = () => {
  
  const [username, setUsername] = useState("")

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const user = {
      username: username
    }
    
    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
    setUsername("")

  }
  
  return (
    <div>
      <h3>Create New User</h3>
      <form
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='form-group'>
          <label>UserName: </label>
          <input
            type="text"
            required
            className='form-control'
            value={username}
            onChange={onChangeUsername}
          />
        </div>

        <div>
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>

      </form>
    </div>
  )
};

CreateUser.propTypes = {};

CreateUser.defaultProps = {};

export default CreateUser;
