"use client";

import { Quiz } from "@/types";
import QuizCard from "./QuizCard";
import { getAllQuizzes } from "@/api/quizzes";
import { useQuery } from "@tanstack/react-query";
import { QuizQueryKeys } from "@/config/queryKeys";

function QuizList() {
  const { data } = useQuery<Quiz[]>({
    queryKey: [QuizQueryKeys.quizzes],
    queryFn: getAllQuizzes,
  });

  if (!data || data.length === 0) {
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
      {data?.map((quiz) => (
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
