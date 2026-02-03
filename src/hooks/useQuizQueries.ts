"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllQuizzes } from "@/api";
import { QuizQueryKeys } from "@/config";
import type { Quiz } from "@/types";

export function useQuizzes() {
  return useQuery<Quiz[]>({
    queryKey: [QuizQueryKeys.quizzes],
    queryFn: getAllQuizzes,
  });
}
