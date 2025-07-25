import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, Button, Stack, Dialog, DialogTitle, DialogActions, DialogContentText,
  Snackbar, Alert
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'error' });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get('/api/expenses/get');
        setExpenses(res.data.expenses);
        const sum = res.data.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        setTotal(sum);
      } catch (err) {
        setError('Failed to load expenses');
        setToast({ open: true, message: 'Failed to fetch expenses', severity: 'error' });
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

  const confirmDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/expenses/delete/${deleteId}`);
      const updatedList = expenses.filter((e) => e._id !== deleteId);
      setExpenses(updatedList);
      const newTotal = updatedList.reduce((acc, curr) => acc + curr.amount, 0);
      setTotal(newTotal);
      setToast({ open: true, message: 'Expense deleted successfully', severity: 'success' });
    } catch (err) {
      setToast({ open: true, message: 'Delete failed', severity: 'error' });
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  let runningTotal = 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1000px' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: '#9333ea',
            textAlign: 'center',
            mb: 2.5
          }}
        >
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
          width="90%"
          maxWidth="900px"
          sx={{
            mt: 1.5,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#fff",
            overflowX: 'auto'
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              maxWidth: "1000px",
              bgcolor: "background.paper",
              textTransform: 'none',
              borderColor: '#c4b5fd',
              boxShadow: 3,
              borderRadius: 2,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#8b5cf6' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Description</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Category</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Cumulative Total</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Actions</TableCell>
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
                        <TableCell>{new Date(exp.date).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</TableCell>
                        <TableCell>₹{runningTotal.toLocaleString()}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ borderRadius: 2, textTransform: 'none' }}
                              onClick={() => handleUpdate(exp)}
                            >
                              Update
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              sx={{ borderRadius: 2, textTransform: 'none' }}
                              onClick={() => confirmDelete(exp._id)}
                            >
                              Delete
                            </Button>
                          </Stack>
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
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContentText sx={{ px: 3 }}>
            This will permanently delete the selected expense. You cannot undo this action.
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={toast.open}
          autoHideDuration={4000}
          onClose={() => setToast({ ...toast, open: false })}
        >
          <Alert
            onClose={() => setToast({ ...toast, open: false })}
            severity={toast.severity}
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ViewExpenses;
