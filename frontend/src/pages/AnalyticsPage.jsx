import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import api from '../services/api';

const AnalyticsPage = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      try {
        const res = await api.get('/api/expenses/monthlyTotal');
        const raw = res.data.monthlyExpenses || [];

        const values = raw.map(entry => entry.totalAmount);
        const labels = raw.map(entry => entry.month);

        setMonthlyData(values);
        setMonthLabels(labels);
      } catch (error) {
        console.error("Error fetching monthly expenses:", error);
      }
    };

    const fetchCategoryExpenses = async () => {
      const fixedOrder = ["Food", "Travel", "Shopping", "Stationery", "Groceries", "Others"];

      try {
        const res = await api.get('/api/expenses/category-wise');
        const raw = res.data.categoryExpenses || [];

        const formatted = fixedOrder.map((cat, index) => {
          const match = raw.find(item => item._id.toLowerCase() === cat.toLowerCase());
          return {
            id: index,
            value: match ? match.totalAmount : 0,
            label: cat,
          };
        });

        setCategoryData(formatted);
      } catch (error) {
        console.error("Error fetching category-wise expenses:", error);
      }
    };

    fetchMonthlyExpenses();
    fetchCategoryExpenses();
  }, []);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 'bold',
          color: '#512da8',
          mb: 5,
        }}
      >
        Expense Analytics
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>
              Monthly Expense Overview
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: monthLabels }]}
              series={[{ data: monthlyData, label: '₹ Total Expense', color: '#1976d2' }]}
              width={450}
              height={300}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>
              Category-wise Expense Distribution
            </Typography>
            <PieChart
              series={[{ data: categoryData }]}
              width={450}
              height={300}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
