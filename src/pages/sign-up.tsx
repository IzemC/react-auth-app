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
import { useSignUp } from "../hooks/use-auth";
import { TextField } from "../components/input";
import { Button } from "../components/button";
import { signUpSchema } from "../schemas/signup.schema";
import { z } from "zod";

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    signUpMutation.mutate(data, {
      onSuccess: () => {
        navigate("/signin");
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
          Create an Account
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
          Fill in your details below to sign up and get started with your
          account.
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
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />

          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {signUpMutation.isError && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {signUpMutation.error?.toString() ??
                "Error signing up, Please try again."}
            </Typography>
          )}

          <Tooltip
            title={isSubmitting ? "Signing up..." : "Click to sign up"}
            placement="top"
          >
            <span>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Sign Up"
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
            Already have an account?{" "}
            <Link
              to="/signin"
              style={{ color: "#3f51b5", textDecoration: "none" }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
