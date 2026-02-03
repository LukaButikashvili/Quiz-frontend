"use client";

import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { SectionHeader } from "@/components/ui";
import { QuestionType } from "@/types";
import OptionInput from "./OptionInput";

interface QuestionOption {
  id: string;
  label: string;
  isCorrectAnswer: boolean;
}

interface OptionsEditorProps {
  options: QuestionOption[];
  questionType: QuestionType;
  onLabelChange: (optionId: string, newLabel: string) => void;
  onToggleCorrect: (optionId: string) => void;
  onRemove: (optionId: string) => void;
  onAdd: () => void;
}

export default function OptionsEditor({
  options,
  questionType,
  onLabelChange,
  onToggleCorrect,
  onRemove,
  onAdd,
}: OptionsEditorProps) {
  return (
    <Box mb={3}>
      <SectionHeader>Answer Options</SectionHeader>
      <Typography variant="caption" color="text.secondary" mb={2}>
        Click the circle/checkbox to mark the correct answer
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {options.map((option) => (
          <OptionInput
            key={option.id}
            option={option}
            questionType={questionType}
            onLabelChange={onLabelChange}
            onToggleCorrect={onToggleCorrect}
            onRemove={onRemove}
          />
        ))}
      </Box>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{
          mt: 2,
          borderStyle: "dashed",
          color: "grey.600",
          borderColor: "grey.300",
          "&:hover": {
            borderColor: "grey.400",
            bgcolor: "grey.50",
          },
        }}
      >
        Add Option
      </Button>
    </Box>
  );
}
