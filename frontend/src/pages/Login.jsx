import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { Box, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post('/api/users/login', formData);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      sx={{ overflow: "hidden" }}
    >
      <Card sx={{ width: 400, padding: 3 }}>
        <CardContent>
          <AuthForm
            title="Login"
            formData={formData}
            setFormData={setFormData}
            error={error}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
