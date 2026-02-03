"use client";

import { Typography } from "@mui/material";
import { QuestionCircleIcon } from "@/assets/icons";

interface EditorHeaderProps {
  isQuestionBlock: boolean;
}

export default function EditorHeader({ isQuestionBlock }: EditorHeaderProps) {
  return (
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
  );
}
