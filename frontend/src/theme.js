// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8b5cf6', // Tailwind's purple-500 for buttons
      contrastText: '#ffffff', // white text on purple
    },
    secondary: {
      main: '#475569', // Tailwind's slate-600 (for optional second buttons)
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb', // light neutral
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', // Tailwind's slate-800
      secondary: '#64748b', // Tailwind's slate-500
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          paddingInline: '20px',
          paddingBlock: '10px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)', // subtle glow on hover
          },
        },
      },
    },
  },
});

export default theme;
