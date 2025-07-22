import ExpenseForm from '../components/ExpenseForm';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import { toast } from 'react-toastify';
import { Container } from '@mui/material';

const AddExpense = () => {
  const navigate = useNavigate();

  const handleAdd = async (data) => {
    try {
      const response = await api.post('/api/expenses/add', data);
      toast.success(response.data.message || "Expense added!");
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    
      <ExpenseForm onSubmit={handleAdd} />

  );
};

export default AddExpense;

