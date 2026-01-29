import { getQueryClient } from "@/lib/getQueryClient";
import { getAllQuizzes } from "@/api/quizzes";
import Header from "@/components/landing/Header";
import QuizList from "@/components/landing/QuizList";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QuizQueryKeys } from "@/config/queryKeys";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QuizQueryKeys.quizzes],
    queryFn: getAllQuizzes,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6">
        <Header />
        <div className="p-10 m-auto max-w-[1280px]">
          <QuizList />
        </div>
      </div>
    </HydrationBoundary>
  );
}
