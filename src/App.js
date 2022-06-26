import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ExercisesList from './components/ExercisesList/ExercisesList';
import EditExercise from './components/EditExercise/EditExercise';
import CreateUser from './components/CreateUser/CreateUser';
import CreateExercise from './components/CreateExercise/CreateExercise';
import Navbar from './components/Navbar/Navbar';

export default function App() {
  return (
    <Router>
      <div className='container'>
      <Navbar />
      <br />
        <Routes>
          <Route path='/' exact element={<ExercisesList/>}/>
          <Route path='/edit/:id' element={<EditExercise/>}/>
          <Route path='/create' element={<CreateExercise/>}/>
          <Route path='/user' element={<CreateUser/>}/>
        </Routes>
      </div>
    </Router>
  );
}