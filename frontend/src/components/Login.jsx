import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button, TextField, Typography,FormControl,InputLabel,Box,InputAdornment,IconButton,
  OutlinedInput
 } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const Login = () =>{
  const[formData, setFormData] = useState({username: "", password: ""});
  const[error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>{
    setFormData(prev =>({
      ...prev,
      [e.target.name] : e.target.value
    }));
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError("");

    try{
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`,formData,{ withCredentials: true },{
        headers:{
          "Content-Type": "application/json"
        }
      });
      const token = response.data.token;
      localStorage.setItem("token",token);
      navigate('/');
    }
    catch(err){
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
  }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw" sx={{ overflow: 'hidden' }}>
      <Card sx={{ width: 400, padding: 3}}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;