"use client";

import { Button, Box } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

interface QuizNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export default function QuizNavigation({
  isFirstStep,
  isLastStep,
  onPrevious,
  onNext,
}: QuizNavigationProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={onPrevious}
        disabled={isFirstStep}
      >
        Previous
      </Button>

      <Button
        variant="contained"
        endIcon={!isLastStep && <ArrowForwardIcon />}
        onClick={onNext}
      >
        {isLastStep ? "Submit Quiz" : "Next"}
      </Button>
    </Box>
  );
}
