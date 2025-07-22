import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AddExpense from "../pages/AddExpense"
import ViewExpenses from "../pages/ViewExpenses";
import AnalyticsPage from "../pages/AnalyticsPage";
import AddIncome from "../pages/AddIncome";
import PrivateRoute from "../components/PrivateRoute";
import AppLayout from "../components/AppLayout"; 



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AppLayout><Dashboard /></AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add-expense"
          element={
            <PrivateRoute>
              <AppLayout><AddExpense /></AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/view-expenses"
          element={
            <PrivateRoute>
              <AppLayout><ViewExpenses /></AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <AppLayout><AnalyticsPage /></AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add-income"
          element={
            <PrivateRoute>
              <AppLayout><AddIncome /></AppLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;