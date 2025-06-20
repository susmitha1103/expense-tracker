import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';

function App(){
  return(
    <Router>
      <h1>Expense Tracker</h1>
      <Routes>
        <Route path= "/register" element = {<Register/>}></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}
export default App
