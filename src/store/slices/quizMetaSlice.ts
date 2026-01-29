import type { StateCreator } from "zustand";
import { getQuizById, createPost, editPost, publishPost } from "@/api/quizzes";
import { getQueryClient } from "@/lib/getQueryClient";
import { QuizQueryKeys } from "@/config/queryKeys";
import type { QuizBlocksSlice } from "./quizBlocksSlice";

export interface QuizMetaSlice {
  quizId: string | null;
  quizTitle: string;
  isPublished: boolean;
  isSaving: boolean;
  isPublishing: boolean;

  setQuizTitle: (title: string) => void;
  fetchQuiz: (id: string) => Promise<void>;
  createQuiz: () => Promise<void>;
  updateQuiz: (id: string) => Promise<void>;
  publishQuiz: () => Promise<boolean>;
  resetStore: () => void;
}

export const createQuizMetaSlice: StateCreator<
  QuizMetaSlice & QuizBlocksSlice,
  [],
  [],
  QuizMetaSlice
> = (set, get) => ({
  quizId: null,
  quizTitle: "",
  isPublished: false,
  isSaving: false,
  isPublishing: false,

  setQuizTitle: (quizTitle) => set({ quizTitle }),

  fetchQuiz: async (id) => {
    const queryClient = getQueryClient();
    const data = await queryClient.fetchQuery({
      queryKey: [QuizQueryKeys.quiz, id],
      queryFn: () => getQuizById(id),
    });
    if (data) {
      set({
        quizId: id,
        quizTitle: data.title ?? "",
        isPublished: !!data.publishedAt,
        blocks: data.blocks ?? [],
      });
    }
  },

  createQuiz: async () => {
    const { quizTitle, blocks } = get();

    set({ isSaving: true });
    try {
      const res = await createPost({ title: quizTitle, blocks });
      if (res?.id) {
        set({ quizId: res.id });
      }
    } finally {
      set({ isSaving: false });
    }
  },

  updateQuiz: async (id: string) => {
    const { quizTitle, blocks } = get();

    set({ isSaving: true });
    try {
      await editPost(id, { title: quizTitle, blocks });
    } finally {
      set({ isSaving: false });
    }
  },

  publishQuiz: async () => {
    const { quizId } = get();
    if (!quizId) return false;

    set({ isPublishing: true });
    try {
      const result = await publishPost(quizId);
      if (result) {
        set({ isPublished: true });
        const queryClient = getQueryClient();
        await queryClient.invalidateQueries({
          queryKey: [QuizQueryKeys.quizzes],
        });
        return true;
      }
      return false;
    } finally {
      set({ isPublishing: false });
    }
  },

  resetStore: () => {
    set({
      quizId: null,
      quizTitle: "",
      isPublished: false,
      isSaving: false,
      isPublishing: false,
      blocks: [],
      selectedBlock: null,
    });
  },
});
