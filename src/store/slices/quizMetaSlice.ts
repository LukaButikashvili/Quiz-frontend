import type { StateCreator } from "zustand";
import type { Quiz } from "@/types";
import type { QuizBlocksSlice } from "./quizBlocksSlice";

export interface QuizMetaSlice {
  quizId: string | null;
  quizTitle: string;
  isPublished: boolean;

  setQuizId: (id: string | null) => void;
  setQuizTitle: (title: string) => void;
  setIsPublished: (isPublished: boolean) => void;
  hydrateFromQuiz: (quiz: Quiz) => void;
  resetStore: () => void;
}

export const createQuizMetaSlice: StateCreator<
  QuizMetaSlice & QuizBlocksSlice,
  [],
  [],
  QuizMetaSlice
> = (set) => ({
  quizId: null,
  quizTitle: "",
  isPublished: false,

  setQuizId: (quizId) => set({ quizId }),

  setQuizTitle: (quizTitle) => set({ quizTitle }),

  setIsPublished: (isPublished) => set({ isPublished }),

  hydrateFromQuiz: (quiz) => {
    set({
      quizId: quiz.id,
      quizTitle: quiz.title ?? "",
      isPublished: !!quiz.publishedAt,
      blocks: quiz.blocks ?? [],
    });
  },

  resetStore: () => {
    set({
      quizId: null,
      quizTitle: "",
      isPublished: false,
      blocks: [],
      selectedBlock: null,
    });
  },
});
