import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function TopBar() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);
  }, []);

  const userInitial = username?.charAt(0)?.toUpperCase() || 'U';

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#6c3fc9' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          ExpenseTracker
        </Typography>

    
        <Box>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: '#fff', color: '#6c3fc9', fontWeight: 'bold' }}>
              {userInitial}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>Dashboard</MenuItem>
            <MenuItem onClick={() => { navigate('/view-expenses'); handleMenuClose(); }}>Expenses</MenuItem>
            <MenuItem onClick={() =>{navigate('/view-income-sources'); handleMenuClose();}}>Income Sources</MenuItem>
            <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
