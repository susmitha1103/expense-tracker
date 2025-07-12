
import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ title, formData, setFormData, error, success, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePage = () => {
    if (title === "Login") navigate("/signup");
    else navigate("/");
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <form onSubmit={onSubmit}>
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
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
        </FormControl>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          {title}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
        )}

        {success && (
          <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>
        )}

        <Typography align="center" sx={{ mt: 2 }}>
          {title === "Login" ? (
            <>New user? <Link onClick={togglePage} sx={{ cursor: "pointer" }}>Register here</Link></>
          ) : (
            <>Already have an account? <Link onClick={togglePage} sx={{ cursor: "pointer" }}>Login here</Link></>
          )}
        </Typography>
      </form>
    </>
  );
};

export default AuthForm;
