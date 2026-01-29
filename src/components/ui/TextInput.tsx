"use client";

import { TextField } from "@mui/material";

interface TextInputProps {
  value?: string;
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
}

function TextInput({
  value,
  handleTextChange,
  placeholder = "Type your answer...",
  label,
}: TextInputProps) {
  return (
    <TextField
      fullWidth
      value={value || ""}
      onChange={handleTextChange}
      placeholder={placeholder}
      label={label}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
    />
  );
}

export default TextInput;
