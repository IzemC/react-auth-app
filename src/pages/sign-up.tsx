import { FormEvent, useState } from "react";
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
import { useSignUp } from "../hooks/use-auth";
import { SignUpCredentials } from "../types/auth.types";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const credentials: SignUpCredentials = { email, password };
    signUpMutation.mutate(credentials, {
      onSuccess: () => {
        navigate("/signin");
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
          Sign Up
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {signUpMutation.isError && (
            <Typography color="error">Error signing up</Typography>
          )}
          <Tooltip
            title={
              signUpMutation.isPending ? "Signing up..." : "Click to sign up"
            }
          >
            <span>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={signUpMutation.isPending}
              >
                {signUpMutation.isPending ? (
                  <CircularProgress size={24} />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </span>
          </Tooltip>
          <Box sx={{ textAlign: "center" }}>
            <Link to="/signin">{"Already have an account? Sign In"}</Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
