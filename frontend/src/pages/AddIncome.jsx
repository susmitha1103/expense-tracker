import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import api from '../services/api';
import { toast } from 'react-toastify';

const AddIncome = () => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post('/api/income/createIncome', {
        amount,
        source: source.toLowerCase(),
      });

      toast.success(response.data.message || 'Income added successfully');
      setAmount('');
      setSource('');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add income');
    } finally {
      setLoading(false);
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
          <InputLabel id="income-source-label">Source</InputLabel>
          <Select
            labelId="income-source-label"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            fullWidth
            required
          >
            {["Salary", "Freelance", "Gift", "Investment", "Rent", "Others"].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Income'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddIncome;
