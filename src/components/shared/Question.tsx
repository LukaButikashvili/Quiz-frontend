"use client";

import { Checkbox, RadioInput, TextInput } from "@/components/ui";
import { QuestionCircleIcon } from "@/assets/icons";
import { QuestionType } from "@/types";
import { getStringValue, getArrayValue } from "@/utils";

interface QuestionOption {
  id?: string;
  label: string;
}

interface QuestionProps {
  id: string;
  order: number;
  type: QuestionType;
  title: string;
  isViewPage?: boolean;
  options?: QuestionOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  onClick?: (value: string) => void;
}

function Question({
  id,
  type,
  title,
  options = [],
  value,
  isViewPage,
  onChange,
  onClick,
}: QuestionProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const getOptionKey = (option: QuestionOption, index: number) => {
    return option.id || `${index}`;
  };

  const handleSingleSelect = (optionKey: string) => {
    onChange?.(optionKey);
  };

  const handleMultiSelect = (optionKey: string) => {
    const currentValues = getArrayValue(value);
    const newValues = currentValues.includes(optionKey)
      ? currentValues.filter((key) => key !== optionKey)
      : [...currentValues, optionKey];
    onChange?.(newValues);
  };

  return (
    <div
      className="p-6 bg-white rounded-2xl border-2 border-indigo-100 shadow-sm hover:border-indigo-200 transition-colors cursor-pointer"
      onClick={() => {
        !isViewPage && onClick && onClick(id);
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <QuestionCircleIcon className="w-4 h-4 text-indigo-600" />
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
          Question
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-5">{title}</h3>

      {type === QuestionType.Text && (
        <TextInput
          value={getStringValue(value)}
          handleTextChange={handleTextChange}
        />
      )}

      {type === QuestionType.Single && (
        <div className="flex flex-col gap-3">
          {options.map((option, index) => {
            const optionKey = getOptionKey(option, index);
            return (
              <RadioInput
                key={optionKey}
                value={getStringValue(value)}
                option={{ id: optionKey, label: option.label }}
                handleSelect={handleSingleSelect}
              />
            );
          })}
        </div>
      )}

      {type === QuestionType.Multi && (
        <div className="flex flex-col gap-3">
          {options.map((option, index) => {
            const optionKey = getOptionKey(option, index);
            return (
              <Checkbox
                key={optionKey}
                option={{ id: optionKey, label: option.label }}
                value={getArrayValue(value)}
                handleSelect={handleMultiSelect}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Question;
