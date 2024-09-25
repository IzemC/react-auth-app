import {
  Link as MaterialLink,
  Button,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const Welcome = () => {
  const { isAuthenticated, logout, email } = useAuthStore();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: isSmallScreen ? "calc(100vh - 56px)" : "calc(100vh - 64px)",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h3"
        sx={{ marginBottom: "20px", fontWeight: "bold", color: "#3f51b5" }}
      >
        Welcome to the application.
      </Typography>

      {!isAuthenticated ? (
        <Box>
          <MaterialLink
            to="/signin"
            component={Link}
            sx={{
              marginRight: "10px",
              textDecoration: "none",
              color: "#3f51b5",
            }}
          >
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </MaterialLink>
          <MaterialLink
            to="/signup"
            component={Link}
            sx={{ textDecoration: "none", color: "#3f51b5" }}
          >
            <Button variant="outlined" color="primary">
              Sign Up
            </Button>
          </MaterialLink>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="body1"
            sx={{ marginBottom: "20px", color: "#3f51b5", fontSize: "1.1rem" }}
          >
            Logged in as <strong>{email}</strong>
          </Typography>
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
              padding: "10px 20px",
              textTransform: "none",
            }}
          >
            Sign Out
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Welcome;
