import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const Header = () => {
  const { isAuthenticated, logout, email } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(45deg, #1a237e, #283593)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        padding: "0 20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
          }}
        >
          Test Auth App
        </Typography>

        {isAuthenticated ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                bgcolor: "#3f51b5",
                marginRight: isSmallScreen ? 1 : 2,
                width: isSmallScreen ? 30 : 40,
                height: isSmallScreen ? 30 : 40,
              }}
            >
              {email?.charAt(0).toUpperCase()}
            </Avatar>

            <Typography
              variant="body1"
              sx={{
                marginRight: isSmallScreen ? "10px" : "20px",
                color: "#fff",
                fontSize: isSmallScreen ? "0.8rem" : "1rem",
              }}
            >
              Logged in as <strong>{email}</strong>
            </Typography>

            {/* Logout Button */}
            <Button
              variant="contained"
              color="secondary"
              onClick={logout}
              sx={{
                backgroundColor: "#f50057",
                ":hover": {
                  backgroundColor: "#c51162",
                },
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                padding: isSmallScreen ? "4px 10px" : "6px 16px",
                fontSize: isSmallScreen ? "0.7rem" : "0.875rem",
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/signin")}
            sx={{
              backgroundColor: "#ffeb3b",
              ":hover": {
                backgroundColor: "#fdd835",
              },
              color: "#000",
              fontWeight: "bold",
              textTransform: "none",
              padding: isSmallScreen ? "4px 10px" : "6px 16px",
              fontSize: isSmallScreen ? "0.7rem" : "0.875rem",
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
