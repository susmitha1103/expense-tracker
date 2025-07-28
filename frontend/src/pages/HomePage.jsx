import { Box, Typography, Card, CardContent } from '@mui/material';
import AuthForm from '../components/AuthForm';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TopBarAuth from '../components/TopBarAuth';


const HomePage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const[error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post('/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/dashboard');
    } catch (err) {
      const error = err.response?.data?.message || 'Login failed';
      setError(error);
    }
  };

  return (
    <Box display="flex" height="100vh" width="100vw">
      <TopBarAuth />

      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#f9fbfd"
        px={4}
      >
        <Card sx={{ width: '100%', maxWidth: 420, p: 4, boxShadow: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" mb={2}>
              Login to continue tracking your finances smartly
            </Typography>
            <AuthForm
              title="Login"
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              error={error}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default HomePage;
