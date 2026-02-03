"use client";

import { QuizCard } from "@/components/shared";
import { useQuizzes } from "@/hooks";

function QuizList() {
  const { data: quizzes } = useQuizzes();

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No quizzes yet
        </h3>
        <p className="text-gray-500 text-center max-w-sm">
          Create your first quiz to get started. Click the button above to
          begin!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          id={quiz.id}
          title={quiz.title}
          isPublished={!!quiz.publishedAt}
          createdAt={quiz.createdAt}
          updatedAt={quiz.updatedAt}
        />
      ))}
    </div>
  );
}

export default QuizList;
