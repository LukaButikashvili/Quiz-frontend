"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  createPost,
  editPost,
  publishPost,
  unpublishPost,
  deleteQuiz,
} from "@/api";
import { QuizQueryKeys } from "@/config";
import { useQuizStore } from "@/store";
import type { QuizItem } from "@/types";

interface QuizData {
  title: string;
  blocks: QuizItem[];
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setQuizId = useQuizStore((state) => state.setQuizId);

  return useMutation({
    mutationFn: (data: QuizData) => createPost(data),
    onSuccess: (response) => {
      if (response?.id) {
        setQuizId(response.id);
        queryClient.invalidateQueries({ queryKey: [QuizQueryKeys.quizzes] });
        router.replace(`/quiz/edit/${response.id}`);
        toast.success("Quiz created!");
      } else {
        throw new Error("Failed to create quiz");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create quiz");
    },
  });
}

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: QuizData }) =>
      editPost(id, data),
    onSuccess: (response, { id }) => {
      if (response) {
        queryClient.invalidateQueries({ queryKey: [QuizQueryKeys.quiz, id] });
        toast.success("Quiz updated!");
      } else {
        throw new Error("Failed to update quiz");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update quiz");
    },
  });
}

export function usePublishQuiz() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setIsPublished = useQuizStore((state) => state.setIsPublished);

  return useMutation({
    mutationFn: (id: string) => publishPost(id),
    onSuccess: (response) => {
      if (response) {
        setIsPublished(true);
        queryClient.invalidateQueries({ queryKey: [QuizQueryKeys.quizzes] });
        toast.success("Quiz published!");
        router.push("/");
      } else {
        throw new Error("Failed to publish quiz");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to publish quiz");
    },
  });
}

export function useUnpublishQuiz() {
  const queryClient = useQueryClient();
  const setIsPublished = useQuizStore((state) => state.setIsPublished);

  return useMutation({
    mutationFn: (id: string) => unpublishPost(id),
    onSuccess: (response) => {
      if (response) {
        setIsPublished(false);
        queryClient.invalidateQueries({ queryKey: [QuizQueryKeys.quizzes] });
        toast.success("Quiz unpublished!");
      } else {
        throw new Error("Failed to unpublish quiz");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to unpublish quiz");
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QuizQueryKeys.quizzes] });
      toast.success("Quiz deleted!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete quiz");
    },
  });
}
