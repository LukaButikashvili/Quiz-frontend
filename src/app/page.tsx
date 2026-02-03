import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib";
import { getAllQuizzes } from "@/api";
import { QuizQueryKeys } from "@/config";
import Header from "@/components/landing/Header";
import QuizList from "@/components/landing/QuizList";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QuizQueryKeys.quizzes],
    queryFn: getAllQuizzes,
  });

  return (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="p-10 m-auto max-w-[1280px]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <QuizList />
        </HydrationBoundary>
      </div>
    </div>
  );
}
