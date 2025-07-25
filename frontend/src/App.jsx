import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </>
    </ThemeProvider>
  );
}

export default App;
