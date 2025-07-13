import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, Button,
} from '@mui/material';
import api from '../services/api';
import UpdateExpense from '../pages/UpdateExpense';

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get('/api/expenses/get');
        setExpenses(res.data.expenses);

        const sum = res.data.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        setTotal(sum);
      } catch (err) {
        console.log("error fetching expenses from backend to frontend", err.message);
        setError('Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleUpdate = (expense) => {
    setSelectedExpense(expense);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/expenses/delete/${id}`);
      const updatedList = expenses.filter((e) => e._id !== id);
      setExpenses(updatedList);
      const newTotal = updatedList.reduce((acc, curr) => acc + curr.amount, 0);
      setTotal(newTotal);
    } catch (err) {
      console.error("Delete failed", err.message);
    }
  };

  let runningTotal = 0;
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom csx={{
      fontWeight: 'bold',
      color: '#6a1b9a', 
      mb: 4
    }}>
        Your Expenses
      </Typography>

      {selectedExpense && (
        <UpdateExpense
          open={open}
          onClose={() => setOpen(false)}
          expense={selectedExpense}
          onUpdate={(updated) => {
            setExpenses((prev) =>
              prev.map((exp) => (exp._id === updated._id ? updated : exp))
            );
            setOpen(false);
          }}
        />
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          paddingLeft: { sm: '310px' },
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
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Amount</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cumulative Total</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(expenses) && expenses.length > 0 ? (
                expenses.map((exp) => {
                  runningTotal += exp.amount;
                  return (
                    <TableRow key={exp._id}>
                      <TableCell>{exp.description}</TableCell>
                      <TableCell>₹{exp.amount.toLocaleString()}</TableCell>
                      <TableCell>{exp.category}</TableCell>
                      <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
                      <TableCell>₹{runningTotal.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="outlined" size="small" color="primary" onClick={() => handleUpdate(exp)}>
                          Update
                        </Button>
                        <Button variant="outlined" size="small" color="error" sx={{ ml: 1 }} onClick={() => handleDelete(exp._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No expenses found.
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={4}><strong>Total</strong></TableCell>
                <TableCell><strong>₹{total.toLocaleString()}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {selectedExpense && (
        <UpdateExpense
          open={open}
          onClose={() => setOpen(false)}
          expense={selectedExpense}
          onUpdate={(updatedExpense) => {
            setExpenses((prev) =>
              prev.map((exp) =>
                exp._id === updatedExpense._id ? updatedExpense : exp
              )
            );

            const newTotal = expenses.reduce((acc, exp) =>
              exp._id === updatedExpense._id
                ? acc + updatedExpense.amount
                : acc + exp.amount,
              0);
            setTotal(newTotal);
          }}
        />
      )}
    </Box>
  );
};

export default ViewExpenses;
