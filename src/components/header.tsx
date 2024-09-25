import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const Header = () => {
  const { isAuthenticated, logout, email } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          App
        </Typography>
        {isAuthenticated ? (
          <Box>
            <Typography
              variant="body1"
              sx={{ display: "inline-block", marginRight: "15px" }}
            >
              Logged in ({email && <strong>{email}</strong>})
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={() => navigate("/signin")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
