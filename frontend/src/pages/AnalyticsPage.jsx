import { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SummaryCards from '../components/SummaryCards';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart';
import CategoryExpensePieChart from '../components/CategoryExpensePieChart';
import IncomeSourcePieChart from '../components/IncomeSourcePieChart';
import api from '../services/api';

const AnalyticsPage = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthLabels, setMonthLabels] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [incomeSourceData, setIncomeSourceData] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [monthly, category, income] = await Promise.all([
          api.get('/api/expenses/monthlyTotal'),
          api.get('/api/expenses/category-wise'),
          api.get('/api/income/source-wise'),
        ]);

        setMonthlyData(monthly.data.monthlyExpenses.map(e => e.totalAmount));
        setMonthLabels(monthly.data.monthlyExpenses.map(e => e.month));

        const fixedOrder = ["Food", "Travel", "Shopping", "Stationery", "Groceries", "Others"];
        const catRaw = category.data.categoryExpenses || [];
        const catFormatted = fixedOrder.map((cat, idx) => {
          const match = catRaw.find(item => item._id.toLowerCase() === cat.toLowerCase());
          return { id: idx, value: match ? match.totalAmount : 0, label: cat };
        });
        setCategoryData(catFormatted);

       const incomeRaw = income.data.incomeSources || [];
        const incomeFormatted = incomeRaw.map((item, idx) => ({
          id: idx,
          value: item.totalAmount,
          label: item._id.charAt(0).toUpperCase() + item._id.slice(1),
        }));
        setIncomeSourceData(incomeFormatted);

      } catch (err) {
        console.error("Analytics fetch error:", err);
      }
    };

    fetchAll();
  }, []);

  return (
    <>
      <SummaryCards />
      <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#512da8', mb: 5 }}>
          Analytics
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <MonthlyExpensesChart data={monthlyData} labels={monthLabels} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CategoryExpensePieChart data={categoryData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <IncomeSourcePieChart data={incomeSourceData} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AnalyticsPage;
