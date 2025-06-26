import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddExpense from "../pages/AddExpense"

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path = "/dashboard" element={<Dashboard/>}/>
      <Route path="/add-expense" element={<AddExpense />} />
    </Routes>
    </Router>
  );
};

export default AppRoutes;