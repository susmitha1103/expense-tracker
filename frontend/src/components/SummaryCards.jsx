import { Box, Card, CardContent, Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import api from '../services/api';
import { useEffect, useState } from 'react';


const SummaryCards = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const fetchTotals = async () => {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        api.get('/api/income/total'),
        api.get('/api/expenses/total'),
      ]);
      setTotalIncome(incomeRes.data.totalIncome);
      setTotalExpense(expenseRes.data.totalExpense);
    } catch (err) {
    }
  };

  useEffect(() => {
    fetchTotals();
  }, []);

  const balance = totalIncome - totalExpense;

  return (
    <Box display="flex" justifyContent="space-around" p={3}>
      <Card sx={{ minWidth: 200, backgroundColor: '#e8f5e9' }}>
        <CardContent>
          <Typography variant="h6" color="green" >Total Income <ArrowUpwardIcon/></Typography>
          <Typography variant="h5">₹ {totalIncome}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 200, backgroundColor: '#ffebee' }}>
        <CardContent>
          <Typography variant="h6" color="red">Total Expenses <ArrowDownwardIcon/></Typography>
          <Typography variant="h5">₹ {totalExpense}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 200, backgroundColor: '#e3f2fd' }}>
        <CardContent>
          <Typography variant="h6" color="primary">Balance <AccountBalanceWalletIcon/></Typography>
          <Typography variant="h5">₹ {balance}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};


export default SummaryCards;
