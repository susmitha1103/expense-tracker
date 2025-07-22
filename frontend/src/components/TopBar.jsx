import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();

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
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/view-expenses')}>Expenses</Button>
          <Button color="inherit" onClick={() => navigate('/')}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
