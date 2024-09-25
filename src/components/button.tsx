import { ButtonProps, Button as MaterialButton } from "@mui/material";
import React from "react";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <MaterialButton
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          padding: "12px 0",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "30px",
          background: "linear-gradient(45deg, #3f51b5, #5c6bc0)",
          boxShadow: "0px 4px 15px rgba(63, 81, 181, 0.4)",
          ":hover": {
            background: "linear-gradient(45deg, #5c6bc0, #3f51b5)",
            boxShadow: "0px 6px 20px rgba(63, 81, 181, 0.5)",
          },
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
