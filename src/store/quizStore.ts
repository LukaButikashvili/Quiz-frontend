import { create } from "zustand";
import {
  createQuizMetaSlice,
  type QuizMetaSlice,
} from "./slices/quizMetaSlice";
import {
  createQuizBlocksSlice,
  type QuizBlocksSlice,
} from "./slices/quizBlocksSlice";

export type QuizStore = QuizMetaSlice & QuizBlocksSlice;

export const useQuizStore = create<QuizStore>()((...args) => ({
  ...createQuizMetaSlice(...args),
  ...createQuizBlocksSlice(...args),
}));
