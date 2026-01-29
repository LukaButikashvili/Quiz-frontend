"use client";

import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  Paper,
} from "@mui/material";

interface CheckboxProps {
  value?: string[];
  option: {
    id: string;
    label: string;
  };
  handleSelect: (id: string) => void;
}

function Checkbox({ value, option, handleSelect }: CheckboxProps) {
  const isChecked = Array.isArray(value) && value.includes(option.id);

  return (
    <Paper
      elevation={0}
      onClick={() => handleSelect(option.id)}
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 3,
        border: 2,
        borderColor: isChecked ? "success.300" : "grey.200",
        bgcolor: isChecked ? "success.50" : "grey.50",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: isChecked ? "success.400" : "grey.300",
        },
      }}
    >
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={isChecked}
            onChange={() => handleSelect(option.id)}
            sx={{
              color: "grey.400",
              "&.Mui-checked": {
                color: "success.main",
              },
            }}
          />
        }
        label={option.label}
        sx={{
          m: 0,
          width: "100%",
          "& .MuiFormControlLabel-label": {
            fontWeight: 500,
            color: isChecked ? "grey.900" : "grey.700",
          },
        }}
      />
    </Paper>
  );
}

export default Checkbox;
