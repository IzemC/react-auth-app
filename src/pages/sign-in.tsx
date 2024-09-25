import { useState, FormEvent } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../hooks/use-auth";
import { SignInCredentials } from "../types/auth.types";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const signInMutation = useSignIn();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const credentials: SignInCredentials = { email, password };
    signInMutation.mutate(credentials, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {signInMutation.isError && (
            <Typography color="error">Invalid login credentials</Typography>
          )}
          <Tooltip
            title={
              signInMutation.isPending ? "Logging in..." : "Click to sign in"
            }
          >
            <span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={signInMutation.isPending}
              >
                {signInMutation.isPending ? (
                  <CircularProgress size={24} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </span>
          </Tooltip>
          <Box sx={{ textAlign: "center" }}>
            <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
