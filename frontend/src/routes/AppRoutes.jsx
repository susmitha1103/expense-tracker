import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddExpense from "../pages/AddExpense"
import ViewExpenses from "../pages/ViewExpenses";
import AnalyticsPage from "../pages/AnalyticsPage";
import AddIncome from "../pages/AddIncome";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};


const AppRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path = "/dashboard" element={<Dashboard/>}/>
      <Route path="/add-expense" element={<AddExpense />} />
      <Route path="/view-expenses" element={<ViewExpenses/>}/>
      <Route path="/reports" element = {<AnalyticsPage/>}/>
      <Route path = "/add-income" element = {<AddIncome/>}/>
    </Routes>
    </Router>
  );
};

export default AppRoutes;