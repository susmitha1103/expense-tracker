import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import api from '../services/api';

const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/income', { amount, source });
      alert('Income added');
      setAmount('');
      setSource('');
    } catch (err) {
      console.error("Failed to add income:", err);
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: 400,
        p: 2,
      }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Income
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Add Income
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddIncome;
