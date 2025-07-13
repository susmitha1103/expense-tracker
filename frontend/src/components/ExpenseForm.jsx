import {useState} from 'react';
import { TextField,Button,Box,FormControl,InputLabel,Select, MenuItem, Typography } from '@mui/material';


const ExpenseForm = ({onSubmit, initialValues={}}) =>{
  
  
  const[category,setCategory] = useState(initialValues.category || '');
  const[amount, setAmount] = useState(initialValues.amount || '');
  const[description, setDescription]= useState(initialValues.description || '');

  const handleSubmit = (e) =>{
    e.preventDefault();
    onSubmit({category, amount, description});
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400, paddingLeft: { sm: '550px' } }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
              Add Your Expenses
            </Typography>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        margin="normal"
      />

      
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          {["housing & utilities",  "healthcare", "shopping", "education & stationery",
       "entertainment", "emis & subscriptions", "miscellaneous"].map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained"  >Add</Button>
    </Box>
  );
};

export default ExpenseForm;