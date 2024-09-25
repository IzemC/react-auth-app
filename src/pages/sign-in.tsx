import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Container,
  Box,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "../hooks/use-auth";
import { TextField } from "../components/input";
import { Button } from "../components/button";
import { signInSchema } from "../schemas/signin.schema";
import { SignInCredentials } from "../types/auth.types";

const SignIn = () => {
  const navigate = useNavigate();
  const signInMutation = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInCredentials>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInCredentials) => {
    signInMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error(error);
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
          backgroundColor: "#f0f4f8",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            color: "#3f51b5",
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 3,
            textAlign: "center",
            color: "#757575",
            maxWidth: "320px",
          }}
        >
          Please sign in to your account with your email and password below.
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1 }}
        >
          <TextField
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />

          {signInMutation.isError && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {signInMutation.error?.toString() ??
                "Error signing in, Please try again."}
            </Typography>
          )}

          <Tooltip
            title={isSubmitting ? "Logging in..." : "Click to sign in"}
            placement="top"
          >
            <span>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign In"
                )}
              </Button>
            </span>
          </Tooltip>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              mt: 2,
              color: "#757575",
              fontSize: "0.9rem",
            }}
          >
            {"Don't have an account? "}
            <Link
              to="/signup"
              style={{ color: "#3f51b5", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
