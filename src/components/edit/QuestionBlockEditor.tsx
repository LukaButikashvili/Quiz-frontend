"use client";

import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioUncheckedIcon,
  CheckBoxOutlineBlank as CheckboxUncheckedIcon,
} from "@mui/icons-material";
import { QuestionCircleIcon } from "@/assets/icons";
import { SectionHeader } from "@/components/ui";
import { BlockType, QuestionType, QuizItem } from "@/types";

interface QuestionOption {
  id: string;
  label: string;
  isCorrectAnswer: boolean;
}

interface QuestionBlockEditorProps {
  quizItem: QuizItem;
  onDelete?: (id: string) => void;
  onSave?: (item: QuizItem) => void;
}

export default function QuestionBlockEditor({
  quizItem,
  onDelete,
  onSave,
}: QuestionBlockEditorProps) {
  const [type, setType] = useState<QuestionType>(
    quizItem.questionType || QuestionType.Single,
  );
  const [localTitle, setLocalTitle] = useState(quizItem.title || "");
  const [localOptions, setLocalOptions] = useState<QuestionOption[]>(
    (quizItem?.options as QuestionOption[]) || [],
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
  };

  const handleQuestionTypeChange = (e: { target: { value: string } }) => {
    const newType = e.target.value as QuestionType;
    setType(newType);

    if (newType === QuestionType.Single) {
      let foundFirst = false;
      const updatedOptions = localOptions.map((opt) => {
        if (opt.isCorrectAnswer && !foundFirst) {
          foundFirst = true;
          return opt;
        }
        return {
          ...opt,
          isCorrectAnswer: foundFirst ? false : opt.isCorrectAnswer,
        };
      });
      setLocalOptions(updatedOptions);
    }
  };

  const handleAddOption = () => {
    const newOption: QuestionOption = {
      id: `option-${Date.now()}`,
      label: "",
      isCorrectAnswer: false,
    };
    setLocalOptions([...localOptions, newOption]);
  };

  const handleOptionLabelChange = (optionId: string, newLabel: string) => {
    const updatedOptions = localOptions.map((opt) =>
      opt.id === optionId ? { ...opt, label: newLabel } : opt,
    );
    setLocalOptions(updatedOptions);
  };

  const handleToggleCorrectAnswer = (optionId: string) => {
    let updatedOptions: QuestionOption[];

    if (type === QuestionType.Single) {
      updatedOptions = localOptions.map((opt) => ({
        ...opt,
        isCorrectAnswer: opt.id === optionId,
      }));
    } else {
      updatedOptions = localOptions.map((opt) =>
        opt.id === optionId
          ? { ...opt, isCorrectAnswer: !opt.isCorrectAnswer }
          : opt,
      );
    }
    setLocalOptions(updatedOptions);
  };

  const handleRemoveOption = (optionId: string) => {
    setLocalOptions(localOptions.filter((opt) => opt.id !== optionId));
  };

  const handleSave = () => {
    const updatedItem: QuizItem = {
      ...quizItem,
      title: localTitle,
      questionType: type,
      options: localOptions,
    };

    onSave?.(updatedItem);
  };

  const handleDelete = () => {
    onDelete?.(quizItem.id);
  };

  const isQuestionBlock = quizItem.type === BlockType.Question;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
              <QuestionCircleIcon className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <Typography variant="subtitle1" fontWeight={600}>
                {isQuestionBlock ? "Question Block" : "Block Settings"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Edit properties
              </Typography>
            </div>
          </div>
        </div>

        <Box mb={3}>
          <SectionHeader>Content</SectionHeader>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Title"
            value={localTitle}
            onChange={handleTitleChange}
            placeholder="Enter your title"
            variant="outlined"
            sx={{ mt: 1 }}
          />
        </Box>

        {isQuestionBlock && (
          <>
            <Box mb={3}>
              <FormControl fullWidth>
                <InputLabel id="question-type-label">Question Type</InputLabel>
                <Select
                  labelId="question-type-label"
                  value={type}
                  label="Question Type"
                  onChange={handleQuestionTypeChange}
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

            {(type === QuestionType.Single || type === QuestionType.Multi) && (
              <Box mb={3}>
                <SectionHeader>Answer Options</SectionHeader>
                <Typography variant="caption" color="text.secondary" mb={2}>
                  Click the circle/checkbox to mark the correct answer
                </Typography>

                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                  {localOptions.map((option) => (
                    <TextField
                      key={option.id}
                      fullWidth
                      value={option.label}
                      onChange={(e) =>
                        handleOptionLabelChange(option.id, e.target.value)
                      }
                      placeholder="Enter option text..."
                      variant="outlined"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: option.isCorrectAnswer
                            ? "success.50"
                            : "grey.50",
                          "& fieldset": {
                            borderColor: option.isCorrectAnswer
                              ? "success.300"
                              : "grey.300",
                          },
                        },
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleToggleCorrectAnswer(option.id)
                                }
                                sx={{
                                  color: option.isCorrectAnswer
                                    ? "success.main"
                                    : "grey.400",
                                }}
                              >
                                {option.isCorrectAnswer ? (
                                  <CheckCircleIcon />
                                ) : type === QuestionType.Single ? (
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
                                onClick={() => handleRemoveOption(option.id)}
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
                  ))}
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddOption}
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
            )}
          </>
        )}
      </div>

      <Box
        p={2}
        pt={4}
        borderTop={1}
        borderColor="grey.200"
        display="flex"
        gap={2}
      >
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </div>
  );
}
