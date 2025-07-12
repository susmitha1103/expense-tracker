import { useEffect, useState } from 'react';
import {
  Box, Typography, TextField, Button, Card, CardContent, Alert
} from '@mui/material';
import api from '../services/api';

const BudgetSection = () => {
  const [amount, setAmount] = useState("");
  const [currentBudget, setCurrentBudget] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [message, setMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    fetchBudget();
    fetchExpenses();
  }, []);

  const fetchBudget = async () => {
    try {
      const res = await api.get("/api/budget/monthly");
      setCurrentBudget(res.data.budget.amount);
    } catch (err) {
      console.error("No budget found", err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await api.get("/api/expenses/current-month-total");
      setTotalExpenses(res.data.total);
    } catch (err) {
      console.error("Error fetching current month expenses", err);
    }
  };

  useEffect(() => {
    if (currentBudget !== null && totalExpenses !== null) {
      setAlertVisible(Number(totalExpenses) > Number(currentBudget));
    }
  }, [currentBudget, totalExpenses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage("Invalid amount");
      return;
    }

    try {
      const res = await api.post("/api/budget/set", { amount });
      setCurrentBudget(res.data.budget.amount);
      setMessage(res.data.message);
      setAmount("");
      fetchExpenses();
    } catch (err) {
      setMessage("Error setting budget");
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',         
        width: '100vw', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Set Monthly Budget
          </Typography>

          {currentBudget !== null && (
            <Typography sx={{ mb: 2 }}>
              Current Budget: <strong>₹{currentBudget}</strong>
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Budget Amount"
              variant="outlined"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Update Budget
            </Button>
          </form>

          {message && (
            <Typography color="primary" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}

          {alertVisible && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Your spending (₹{totalExpenses}) has exceeded your monthly budget!
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BudgetSection;
