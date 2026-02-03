"use client";

import { TextField, IconButton, InputAdornment } from "@mui/material";
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioUncheckedIcon,
  CheckBoxOutlineBlank as CheckboxUncheckedIcon,
} from "@mui/icons-material";
import { QuestionType } from "@/types";

interface QuestionOption {
  id: string;
  label: string;
  isCorrectAnswer: boolean;
}

interface OptionInputProps {
  option: QuestionOption;
  questionType: QuestionType;
  onLabelChange: (optionId: string, newLabel: string) => void;
  onToggleCorrect: (optionId: string) => void;
  onRemove: (optionId: string) => void;
}

export default function OptionInput({
  option,
  questionType,
  onLabelChange,
  onToggleCorrect,
  onRemove,
}: OptionInputProps) {
  return (
    <TextField
      fullWidth
      value={option.label}
      onChange={(e) => onLabelChange(option.id, e.target.value)}
      placeholder="Enter option text..."
      variant="outlined"
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          bgcolor: option.isCorrectAnswer ? "success.50" : "grey.50",
          "& fieldset": {
            borderColor: option.isCorrectAnswer ? "success.300" : "grey.300",
          },
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                size="small"
                onClick={() => onToggleCorrect(option.id)}
                sx={{
                  color: option.isCorrectAnswer ? "success.main" : "grey.400",
                }}
              >
                {option.isCorrectAnswer ? (
                  <CheckCircleIcon />
                ) : questionType === QuestionType.Single ? (
                  <RadioUncheckedIcon />
                ) : (
                  <CheckboxUncheckedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => onRemove(option.id)}
                sx={{
                  color: "grey.400",
                  "&:hover": { color: "error.main" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
