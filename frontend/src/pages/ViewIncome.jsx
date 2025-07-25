import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Box, Button, Stack,
  Dialog, DialogTitle, DialogActions, DialogContentText
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';
import UpdateIncome from '../components/UpdateIncome';

const ViewIncome = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({ id: '', source: '', amount: '' });

  const fetchIncomeData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/income/incomes');
      const incomes = res.data.incomes || [];
      setIncomeList(incomes);
      const sum = incomes.reduce((acc, curr) => acc + curr.amount, 0);
      setTotal(sum);
    } catch (err) {
      toast.error("Failed to load income");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/income/delete/${deleteId}`);
      toast.success(" Income deleted");
      fetchIncomeData();
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const openEditDialog = (income) => {
    setEditData({
      id: income._id,
      source: income.source,
      amount: income.amount
    });
    setEditOpen(true);
  };

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
          sx={{
            fontWeight: 600,
            color: '#10b981',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Your Income Sources
        </Typography>

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
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#10b981' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Source</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Amount</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Date</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">Loading...</TableCell>
                  </TableRow>
                ) : incomeList.length > 0 ? (
                  incomeList.map((inc) => (
                    <TableRow key={inc._id}>
                      <TableCell>{inc.source}</TableCell>
                      <TableCell>₹{inc.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        {inc.createdAt
                          ? new Date(inc.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                            onClick={() => openEditDialog(inc)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                            onClick={() => confirmDelete(inc._id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No income records found.</TableCell>
                  </TableRow>
                )}
                {!loading && (
                  <TableRow>
                    <TableCell colSpan={2}><strong>Total</strong></TableCell>
                    <TableCell><strong>₹{total.toLocaleString()}</strong></TableCell>
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContentText sx={{ px: 3 }}>
            Are you sure you want to delete this income entry?
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>

        <UpdateIncome
          open={editOpen}
          onClose={() => setEditOpen(false)}
          income={incomeList.find((i) => i._id === editData.id)}
          onUpdate={() => {
            fetchIncomeData();
            setEditOpen(false);
            toast.success("✅ Income updated successfully");
          }}
        />
      </Box>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default ViewIncome;
