import { Box, Typography } from '@mui/material';

const TopBarAuth = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#7c3aed',
        padding: '12px 24px',
        width: '100%',
        position: 'fixed', 
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'left',
        }}
      >
        Expense Tracker
      </Typography>
    </Box>
  );
};

export default TopBarAuth;
