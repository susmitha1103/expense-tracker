import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box
} from '@mui/material';
import api from '../services/api';

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get('/api/expenses/get');
        setExpenses(res.data.expenses);

        
        const sum = res.data.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        setTotal(sum);
      } catch (err) {
        console.log("error fetching expenses from backend to frontend",err.message)
        setError('Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  let runningTotal = 0;
return(
 <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Your Expenses
      </Typography>

      <Box
        sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // aligns from top
        minHeight: "100vh",  
        paddingLeft: { sm: '450px' },     // full screen height if needed
        p: 2,
        boxSizing: "border-box"
      }}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            maxWidth: "1000px",
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cumulative Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((exp) => {
                runningTotal += exp.amount;
                return (
                  <TableRow key={exp._id}>
                    <TableCell>{exp.title}</TableCell>
                    <TableCell>₹{exp.amount.toLocaleString()}</TableCell>
                    <TableCell>{exp.category}</TableCell>
                    <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
                    <TableCell>₹{runningTotal.toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={4}><strong>Total</strong></TableCell>
                <TableCell><strong>₹{total.toLocaleString()}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ViewExpenses;
