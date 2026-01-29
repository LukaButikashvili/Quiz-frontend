"use client";

import { FormControlLabel, Radio, Paper } from "@mui/material";

interface RadioInputProps {
  value?: string | undefined;
  option: {
    id: string;
    label: string;
  };
  handleSelect: (id: string) => void;
}

function RadioInput({ value, option, handleSelect }: RadioInputProps) {
  const isSelected = value === option.id;

  return (
    <Paper
      elevation={0}
      onClick={() => handleSelect(option.id)}
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 3,
        border: 2,
        borderColor: isSelected ? "success.300" : "grey.200",
        bgcolor: isSelected ? "success.50" : "grey.50",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: isSelected ? "success.400" : "grey.300",
        },
      }}
    >
      <FormControlLabel
        control={
          <Radio
            checked={isSelected}
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
            color: isSelected ? "grey.900" : "grey.700",
          },
        }}
      />
    </Paper>
  );
}

export default RadioInput;
