import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getQuizById } from "@/api/quizzes";
import { QuizQueryKeys } from "@/config/queryKeys";
import QuizEditor from "@/components/edit/QuizEditor";

export default async function EditQuizPage({
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
      <QuizEditor id={id} />
    </HydrationBoundary>
  );
}
