interface QuizProgressProps {
  currentStep: number;
  totalQuestions: number;
}

export default function QuizProgress({
  currentStep,
  totalQuestions,
}: QuizProgressProps) {
  const percentage = Math.round(((currentStep + 1) / totalQuestions) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Question {currentStep + 1} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-500">{percentage}% complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
