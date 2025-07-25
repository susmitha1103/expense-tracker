import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
  FormLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const sources = ['salary', 'rent', 'freelance', 'investment', 'gift', 'others'];

const UpdateIncome = ({ open, onClose, income, onUpdate }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && income) {
      setAmount(String(income.amount || ''));
      setSource(income.source || '');
      setDate(income.date?.slice(0, 10) || '');
    }
  }, [open, income]);

  const handleSubmit = async () => {
    if (!amount || !source || !date) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const res = await api.put(`/api/income/update/${income._id}`, {
        amount: Number(amount),
        source,
        date,
      });
      toast.success('Income updated');
      onUpdate(res.data.income);
      onClose();
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Failed to update income');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Income</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <TextField
            label="Source"
            select
            fullWidth
            required
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            {sources.map((src) => (
              <MenuItem key={src} value={src}>
                {src}
              </MenuItem>
            ))}
          </TextField>

          <Stack direction="column">
            <FormLabel>Date</FormLabel>
            <TextField
              type="date"
              fullWidth
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateIncome;
