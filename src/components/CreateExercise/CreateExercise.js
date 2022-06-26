import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import axios from 'axios';

export default class CreateExercise extends Component{
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
      message: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then((response) => {
        if (response.data.length) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => this.setState({message: error.message}));
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    }

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then((response) => {
        this.setState({ message: response.data })
        window.location = '/'
      })
      .catch((error) => this.setState({message: error.message}));
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>UserName: </label>
            <select
              required
              className='form-control'
              value={this.state.username}
              onChange={(e) => this.setState({username: e.target.value})}
              onFocus={() => this.setState({message: ""})}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='form-group'>     
            <label>Description: </label>
            <input
              type="text"
              required
              className='form-control'
              value={this.state.description}
              onChange={(e) => this.setState({description: e.target.value})}
              onFocus={() => this.setState({message: ""})}
            />
          </div>
          <div className='form-group'>     
            <label>Duration (In Minutes): </label>
            <input
              type="text"
              required
              className='form-control'
              value={this.state.duration}
              onChange={(e) => this.setState({duration: e.target.value})}
              onFocus={() => this.setState({message: ""})}
            />
          </div>
          <div className='form-group'>     
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={(date) => this.setState({date})}
              onFocus={() => this.setState({message: ""})}
            />
          </div>
          <div className='mt-3'>
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
        <h3>{this.state.message}</h3>
      </div>
    )
  }
};
