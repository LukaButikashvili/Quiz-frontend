"use client";

import { Button } from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";
import Link from "next/link";
import {
  getScorePercentage,
  getScoreMessage,
  getScoreColor,
  getScoreProgressColor,
} from "@/utils";

interface QuizScoreProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

export default function QuizScore({
  score,
  totalQuestions,
  onRetry,
}: QuizScoreProps) {
  const percentage = getScorePercentage(score, totalQuestions);
  const message = getScoreMessage(percentage);
  const color = getScoreColor(percentage);
  const progressColor = getScoreProgressColor(percentage);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-white rounded-2xl border-2 border-indigo-100 shadow-sm">
      <div className="mb-6">
        <CheckCircleIcon sx={{ fontSize: 80 }} className={color} />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">{message}</h2>

      <p className="text-gray-600 mb-6">You have completed the quiz</p>

      <div className="flex items-center gap-2 mb-8">
        <span className={`text-5xl font-bold ${color}`}>{score}</span>
        <span className="text-2xl text-gray-400">/</span>
        <span className="text-2xl text-gray-600">{totalQuestions}</span>
      </div>

      <div className="w-full max-w-xs bg-gray-200 rounded-full h-3 mb-8">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-lg text-gray-600 mb-8">
        You scored <span className="font-semibold">{percentage}%</span>
      </p>

      <div className="flex gap-4">
        <Button variant="outlined" onClick={onRetry}>
          Try Again
        </Button>

        <Link href="/">
          <Button variant="contained">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
