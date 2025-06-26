import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import theme from './theme'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </ThemeProvider>
  );
}

export default App;
