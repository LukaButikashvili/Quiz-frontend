"use client";

import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { QuestionType } from "@/types";

interface QuestionTypeSelectorProps {
  value: QuestionType;
  onChange: (type: QuestionType) => void;
}

export default function QuestionTypeSelector({
  value,
  onChange,
}: QuestionTypeSelectorProps) {
  const handleChange = (e: { target: { value: string } }) => {
    onChange(e.target.value as QuestionType);
  };

  return (
    <Box mb={3}>
      <FormControl fullWidth>
        <InputLabel id="question-type-label">Question Type</InputLabel>
        <Select
          labelId="question-type-label"
          value={value}
          label="Question Type"
          onChange={handleChange}
        >
          <MenuItem value={QuestionType.Single}>
            Multiple Choice (Single Answer)
          </MenuItem>
          <MenuItem value={QuestionType.Multi}>
            Multiple Choice (Multiple Answers)
          </MenuItem>
          <MenuItem value={QuestionType.Text}>Text Answer</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
