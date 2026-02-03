import { getQuizById } from "@/api";
import QuizEditor from "@/components/edit/QuizEditor";

export default async function EditQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = await getQuizById(id);

  return <QuizEditor initialQuiz={quiz} />;
}
