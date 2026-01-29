import axios from "@/lib/axios";
import { QuizItem } from "@/types";

export async function getAllQuizzes() {
  return await axios
    .get("/quizzes")
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching quizzes:", err);
      return [];
    });
}

export async function getQuizById(id: string) {
  return await axios
    .get(`/quizzes/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching quiz:", err);
      return null;
    });
}

export async function publishPost(id: string) {
  return await axios.post(`/quizzes/${id}/publish`).catch((err) => {
    console.error("Error fetching quiz:", err);
    return null;
  });
}

export async function createPost(data: { title: string; blocks: QuizItem[] }) {
  return await axios
    .post(`/quizzes`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error creating quiz:", err);
      return null;
    });
}

export async function editPost(
  id: string,
  data: {
    title: string;
    blocks: QuizItem[];
  },
) {
  return await axios.put(`/quizzes/${id}`, data).catch((err) => {
    console.error("Error fetching quiz:", err);
    return null;
  });
}
