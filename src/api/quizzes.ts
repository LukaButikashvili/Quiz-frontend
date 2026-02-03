import { axios } from "@/lib";
import { QuizItem } from "@/types";

export async function getAllQuizzes() {
  try {
    const res = await axios.get("/quizzes");
    return res.data;
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    return [];
  }
}

export async function getQuizById(id: string) {
  try {
    const res = await axios.get(`/quizzes/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching quiz:", err);
    return null;
  }
}

export async function publishPost(id: string) {
  try {
    const res = await axios.post(`/quizzes/${id}/publish`);
    return res.data;
  } catch (err) {
    console.error("Error publishing quiz:", err);
    return null;
  }
}

export async function unpublishPost(id: string) {
  try {
    const res = await axios.post(`/quizzes/${id}/unpublish`);
    return res.data;
  } catch (err) {
    console.error("Error unpublishing quiz:", err);
    return null;
  }
}

export async function createPost(data: { title: string; blocks: QuizItem[] }) {
  try {
    const res = await axios.post(`/quizzes`, data);
    return res.data;
  } catch (err) {
    console.error("Error creating quiz:", err);
    return null;
  }
}

export async function editPost(
  id: string,
  data: {
    title: string;
    blocks: QuizItem[];
  },
) {
  try {
    const res = await axios.put(`/quizzes/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating quiz:", err);
    return null;
  }
}

export async function deleteQuiz(id: string) {
  try {
    await axios.delete(`/quizzes/${id}`);
    return { success: true };
  } catch (err) {
    console.error("Error deleting quiz:", err);
    throw err;
  }
}
