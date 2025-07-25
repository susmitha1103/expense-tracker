import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const location = useLocation();

  useEffect(() => {
    if (!token || !username) {
      toast.error("Session expired. Please login again.");
    }
  }, []);

  if (!token || !username) {
    return (
      <Box
        height="100vh"
        width="100vw"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        bgcolor="#f9f9f9"
        p={2}
      >
        <Typography variant="h5" color="error" gutterBottom>
          🔒 Unauthorized Access
        </Typography>
        <Typography variant="body1" mb={2}>
          You must be logged in to view this page.
        </Typography>
        <Button variant="contained" href="/login">
          Go to Login
        </Button>
      </Box>
    );
  }

  return children;
};


export default PrivateRoute;
