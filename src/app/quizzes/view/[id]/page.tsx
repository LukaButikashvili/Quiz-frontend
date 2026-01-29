import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getQuizById } from "@/api/quizzes";
import { QuizQueryKeys } from "@/config/queryKeys";
import QuizViewer from "@/components/view/QuizViewer";

export default async function ViewQuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QuizQueryKeys.quiz, id],
    queryFn: () => getQuizById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QuizViewer />
    </HydrationBoundary>
  );
}
