import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem,ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutButton from '../components/LogoutButton';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'; 
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';



const drawerWidth = 240;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
  { text: "Overview", path: "/dashboard", icon: <DashboardIcon /> },
  { text: "Add Expense", path: "/add-expense", icon: <AddIcon /> },
  { text: "Reports", path: "/reports", icon: <AssessmentIcon /> },
  { text: "Settings", path: "/settings", icon : <SettingsIcon/>}
];

  const drawer = (
    <List>
  {navItems.map((item) => (
    <ListItem
      button
      key={item.text}
      component={Link}
      to={item.path}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.text} />
    </ListItem>
  ))}
</List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
           <LogoutButton />
        </Toolbar>
      </AppBar>

      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        {drawer}
      </Drawer>

      
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
        open
      >
        {drawer}
      </Drawer>

      
      <Box
        component="main"
        sx={{
        flexGrow: 1,
        p: 3,
        mt: 8, 
        ml: { sm: `${drawerWidth}px` }, 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
      }}
      >
        <Typography variant="h4">Welcome, {localStorage.getItem("username") || "User"}!</Typography>
        <Typography>Here's your dashboard content.</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;