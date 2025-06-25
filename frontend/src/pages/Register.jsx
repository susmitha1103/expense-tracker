import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import AuthForm from "../components/AuthForm";
import api from "../services/api";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/api/users/register", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      setSuccess(response.data.message);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
      <Card sx={{ width: 400, p: 3 }}>
        <CardContent>
          <AuthForm
            title="Register"
            formData={formData}
            setFormData={setFormData}
            error={error}
            success={success}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
