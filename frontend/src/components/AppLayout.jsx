import { Box, Toolbar } from "@mui/material";
import TopBar from "./TopBar";

const AppLayout = ({ children }) => {
  return (
    <Box sx={{ display: "static", flexDirection: "column", minHeight: "100vh" }}>
      <TopBar />
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
