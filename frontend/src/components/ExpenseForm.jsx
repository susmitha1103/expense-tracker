import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const ExpenseForm = ({ onSubmit, initialValues = {} }) => {
  const [category, setCategory] = useState(initialValues.category || '');
  const [amount, setAmount] = useState(initialValues.amount || '');
  const [description, setDescription] = useState(initialValues.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ category, amount, description });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: 'calc(100vh - 64px)', // subtract AppBar height if fixed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Add Your Expenses
        </Typography>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {[
              "housing & utilities",
              "healthcare",
              "shopping",
              "education & stationery",
              "entertainment",
              "emis & subscriptions",
              "miscellaneous",
            ].map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default ExpenseForm;
