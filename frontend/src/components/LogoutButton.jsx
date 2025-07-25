import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    console.log("After logout:", {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
    });

    navigate('/');
    window.location.reload(); 
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
