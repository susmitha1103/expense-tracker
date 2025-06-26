import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddExpense from "../pages/AddExpense"
import ViewExpenses from "../pages/ViewExpenses";

const AppRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path = "/dashboard" element={<Dashboard/>}/>
      <Route path="/add-expense" element={<AddExpense />} />
      <Route path="/view-expenses" element={<ViewExpenses/>}/>
    </Routes>
    </Router>
  );
};

export default AppRoutes;