import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8b5cf6', 
      contrastText: '#ffffff', 
    },
    secondary: {
      main: '#475569', 
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb', 
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', 
      secondary: '#64748b', 
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  breakpoints: {
  values: {
    xs: 0,     
    sm: 600,   
    md: 900,   
    lg: 1200,  
    xl: 1536,  
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
            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)', 
          },
        },
      },
    },
  },
});

export default theme;
