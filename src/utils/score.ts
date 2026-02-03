import { QuestionType, type QuizItem } from "@/types";

type Answers = Record<string, string | string[]>;

/**
 * Calculate the score for a quiz based on user answers
 */
export function calculateQuizScore(
  questions: QuizItem[],
  answers: Answers,
): number {
  let correct = 0;

  questions.forEach((question) => {
    const userAnswer = answers[question.id];
    const options = question.options ?? [];

    if (question.questionType === QuestionType.Single) {
      const correctOption = options.find((opt) => opt.isCorrectAnswer);
      if (correctOption && userAnswer === correctOption.id) {
        correct++;
      }
    } else if (question.questionType === QuestionType.Multi) {
      const correctIds = options
        .filter((opt) => opt.isCorrectAnswer)
        .map((opt) => opt.id)
        .sort();
      const userAnswerIds = Array.isArray(userAnswer)
        ? [...userAnswer].sort()
        : [];

      if (
        correctIds.length === userAnswerIds.length &&
        correctIds.every((id, idx) => id === userAnswerIds[idx])
      ) {
        correct++;
      }
    } else if (question.questionType === QuestionType.Text) {
      if (userAnswer && typeof userAnswer === "string" && userAnswer.trim()) {
        correct++;
      }
    }
  });

  return correct;
}

/**
 * Get score percentage
 */
export function getScorePercentage(score: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Get message based on score percentage
 */
export function getScoreMessage(percentage: number): string {
  if (percentage === 100) return "Perfect Score!";
  if (percentage >= 80) return "Great Job!";
  if (percentage >= 60) return "Good Effort!";
  if (percentage >= 40) return "Keep Practicing!";
  return "Better Luck Next Time!";
}

/**
 * Get color class based on score percentage
 */
export function getScoreColor(percentage: number): string {
  if (percentage >= 80) return "text-emerald-600";
  if (percentage >= 60) return "text-amber-500";
  return "text-red-500";
}

/**
 * Get progress bar color class based on score percentage
 */
export function getScoreProgressColor(percentage: number): string {
  if (percentage >= 80) return "bg-emerald-500";
  if (percentage >= 60) return "bg-amber-500";
  return "bg-red-500";
}
