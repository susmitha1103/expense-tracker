import Button from '@mui/material/Button';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState('loggedIn');

  const handleLogout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuthStatus('true');
    navigate('/login');
  }

  return(
    <Button variant="contained" onClick = {handleLogout} >Logout</Button>
  );
}

export default LogoutButton;