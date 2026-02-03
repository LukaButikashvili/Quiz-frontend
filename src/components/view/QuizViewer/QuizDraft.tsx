export default function QuizDraft() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <p className="text-3xl font-semibold text-amber-600 uppercase tracking-wide mb-2">
          Draft
        </p>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Not published yet
        </h1>

        <p className="text-gray-500 mb-8">
          This quiz is still being worked on. Please check back later.
        </p>
      </div>
    </div>
  );
}
