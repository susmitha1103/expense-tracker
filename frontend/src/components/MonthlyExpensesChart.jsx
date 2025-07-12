import { Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const MonthlyExpensesChart = ({ data, labels }) => (
  <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>
      Monthly Expense Overview
    </Typography>
    <BarChart
      xAxis={[{ scaleType: 'band', data: labels }]}
      series={[{ data, label: '₹ Total Expense', color: '#1976d2' }]}
      width={450}
      height={300}
    />
  </Paper>
);

export default MonthlyExpensesChart;
