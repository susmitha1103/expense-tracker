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
import HomePage from "../pages/HomePage";
import ViewIncome from "../pages/ViewIncome";
import NotFound from '../pages/NotFound';
import RedirectHandler from "../pages/RedirectHandler";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RedirectHandler />} />  
        <Route path="/home" element={<HomePage />} />     
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
          path="/view-income-sources"
          element={
            <PrivateRoute>
              <AppLayout><ViewIncome /></AppLayout>
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;