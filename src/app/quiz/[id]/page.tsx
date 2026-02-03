import { getQuizById } from "@/api";
import QuizViewer from "@/components/view/QuizViewer";

export default async function ViewQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = await getQuizById(id);

  return <QuizViewer quiz={quiz} />;
}
