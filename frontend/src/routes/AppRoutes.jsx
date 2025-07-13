import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddExpense from "../pages/AddExpense"
import ViewExpenses from "../pages/ViewExpenses";
import AnalyticsPage from "../pages/AnalyticsPage";
import AddIncome from "../pages/AddIncome";
import PrivateRoute from "../components/PrivateRoute";



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-expense" element={<PrivateRoute><AddExpense /></PrivateRoute>} />
        <Route path="/view-expenses" element={<PrivateRoute><ViewExpenses /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><AnalyticsPage /></PrivateRoute>} />
        <Route path="/add-income" element={<PrivateRoute><AddIncome /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;