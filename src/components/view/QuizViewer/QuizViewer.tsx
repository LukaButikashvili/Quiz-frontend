"use client";

import { useState, useMemo } from "react";
import { Header, Question, Footer } from "@/components/shared";
import { QuizScore } from "@/components/view";
import { BlockType, QuestionType, type Quiz } from "@/types";
import { calculateQuizScore } from "@/utils";
import QuizProgress from "./QuizProgress";
import QuizNavigation from "./QuizNavigation";
import QuizNotFound from "./QuizNotFound";
import QuizDraft from "./QuizDraft";
import QuizEmpty from "./QuizEmpty";

type Answers = Record<string, string | string[]>;

interface QuizViewerProps {
  quiz: Quiz | null;
}

export default function QuizViewer({ quiz }: QuizViewerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const { headerItem, footerItem, questions } = useMemo(() => {
    const blocks = quiz?.blocks ?? [];
    let header: (typeof blocks)[number] | undefined;
    let footer: (typeof blocks)[number] | undefined;
    const questionList: typeof blocks = [];

    for (const item of blocks) {
      if (item.type === BlockType.Header) {
        header = item;
      } else if (item.type === BlockType.Footer) {
        footer = item;
      } else if (item.type === BlockType.Question) {
        questionList.push(item);
      }
    }

    return { headerItem: header, footerItem: footer, questions: questionList };
  }, [quiz?.blocks]);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalQuestions - 1;

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      setIsCompleted(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRetry = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const score = useMemo(() => {
    if (!isCompleted) return 0;
    return calculateQuizScore(questions, answers);
  }, [isCompleted, questions, answers]);

  if (!quiz) {
    return <QuizNotFound />;
  }

  if (!quiz.publishedAt) {
    return <QuizDraft />;
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 p-10">
        <div className="max-w-2xl mx-auto">
          {headerItem && (
            <div className="mb-6">
              <Header title={headerItem.title || quiz.title} />
            </div>
          )}

          <QuizScore
            score={score}
            totalQuestions={totalQuestions}
            onRetry={handleRetry}
          />

          {footerItem && (
            <div className="mt-6">
              <Footer footerItem={footerItem} />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <QuizEmpty />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-2xl mx-auto">
        {headerItem && (
          <div className="mb-6">
            <Header title={headerItem.title || quiz.title} />
          </div>
        )}

        <QuizProgress
          currentStep={currentStep}
          totalQuestions={totalQuestions}
        />

        <div className="mb-6">
          <Question
            id={currentQuestion.id}
            order={currentStep + 1}
            type={currentQuestion.questionType || QuestionType.Single}
            title={currentQuestion.title}
            options={currentQuestion.options}
            value={answers[currentQuestion.id]}
            onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            isViewPage
          />
        </div>

        <QuizNavigation
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {footerItem && (
          <div className="mt-6">
            <Footer footerItem={footerItem} />
          </div>
        )}
      </div>
    </div>
  );
}
