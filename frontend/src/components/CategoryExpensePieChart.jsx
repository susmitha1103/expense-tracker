import { Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const CategoryExpensePieChart = ({ data }) => (
  <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 600 }}>
      Category-wise Expense Distribution
    </Typography>
    <PieChart series={[{ data }]} width={450} height={300} />
  </Paper>
);

export default CategoryExpensePieChart;
