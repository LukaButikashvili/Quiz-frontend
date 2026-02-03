"use client";

import { useState } from "react";
import { TextField, Box } from "@mui/material";
import { SectionHeader } from "@/components/ui";
import { BlockType, QuestionType, QuizItem } from "@/types";
import EditorHeader from "./EditorHeader";
import EditorActions from "./EditorActions";
import QuestionTypeSelector from "./QuestionTypeSelector";
import OptionsEditor from "./OptionsEditor";

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

  const isQuestionBlock = quizItem.type === BlockType.Question;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
  };

  const handleQuestionTypeChange = (newType: QuestionType) => {
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        <EditorHeader isQuestionBlock={isQuestionBlock} />

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
            <QuestionTypeSelector
              value={type}
              onChange={handleQuestionTypeChange}
            />

            {(type === QuestionType.Single || type === QuestionType.Multi) && (
              <OptionsEditor
                options={localOptions}
                questionType={type}
                onLabelChange={handleOptionLabelChange}
                onToggleCorrect={handleToggleCorrectAnswer}
                onRemove={handleRemoveOption}
                onAdd={handleAddOption}
              />
            )}
          </>
        )}
      </div>

      <EditorActions onDelete={handleDelete} onSave={handleSave} />
    </div>
  );
}
