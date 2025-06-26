import {useState} from 'react';
import { TextField,Button,Box,FormControl,InputLabel,Select, MenuItem } from '@mui/material';


const ExpenseForm = ({onSubmit, initialValues={}}) =>{
  
  const[title, setTitle]= useState(initialValues.title || '');
  const[amount, setAmount] = useState(initialValues.amount || '');
  const[category,setCategory] = useState(initialValues.category || '');

  const handleSubmit = (e) =>{
    e.preventDefault();
    onSubmit({title, amount, category});
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
          {["food", "travel", "shopping", "stationery", "groceries", "others"].map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default ExpenseForm;