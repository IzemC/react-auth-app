import React from "react";
import { TextField as MaterialTextField, TextFieldProps } from "@mui/material";

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type = "text", ...props }, ref) => {
    return (
      <MaterialTextField
        margin="normal"
        fullWidth
        type={type}
        inputRef={ref}
        slotProps={{
          input: {
            sx: {
              backgroundColor: "white",
              borderRadius: 1,
            },
          },
        }}
        {...props}
      />
    );
  }
);
