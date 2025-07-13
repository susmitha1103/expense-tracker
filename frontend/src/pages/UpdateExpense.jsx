import { useState, useEffect} from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions,
MenuItem, Select, InputLabel, FormControl } from '@mui/material';

import api from '../services/api';
import { toast } from 'react-toastify';


  const UpdateExpense = ({ open, onClose, expense, onUpdate }) => {
  const [form, setForm] = useState({ ...expense });

  useEffect(() => {
    if (expense) {
      setForm({ ...expense });
    }
  }, [expense]);
  

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await api.put(`/api/expenses/update/${expense._id}`, form);
      toast.success("Updated!");
       onUpdate(res.data.updatedExpenses);
      onClose();
    } catch (err) {
      toast.error("Update failed");
    }
  };


 return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Expense</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Description"
          name="description"
          value={form.title}
          onChange={handleChange}
        />
        <TextField
          label="Amount"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
        />
        <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
          <Select
           name="category"
           value={form.category}
           label="Category"
           onChange={handleChange}
          >
          <MenuItem value="housing & utilities">Housing and Utilities</MenuItem>
          <MenuItem value="shopping">Shopping</MenuItem>
          <MenuItem value="education & stationery">Education and Stationery</MenuItem>
          <MenuItem value="healthcare">Healthcare</MenuItem>
          <MenuItem value="entertainment">Entertainment</MenuItem>
          <MenuItem value="emis & subscription">EMIs and Subscription</MenuItem>
          <MenuItem value="miscellaneous">Miscellaneous</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date"
          name="date"
          type="date"
          value={form.date?.substring(0, 10)}
          onChange={handleChange}
        />
        <TextField
          label="Note"
          name="note"
          value={form.note}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateExpense;
