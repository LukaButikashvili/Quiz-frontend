"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button, Box, CircularProgress } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { Header, Question, Footer } from "@/components/shared";
import QuizScore from "./QuizScore";
import { getQuizById } from "@/api/quizzes";
import { QuizQueryKeys } from "@/config/queryKeys";
import { BlockType, QuestionType, type Quiz } from "@/types";

type Answers = Record<string, string | string[]>;

export default function QuizViewer() {
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const { data: quiz, isLoading } = useQuery<Quiz>({
    queryKey: [QuizQueryKeys.quiz, id],
    queryFn: () => getQuizById(id),
    enabled: !!id,
  });

  const blocks = quiz?.blocks ?? [];

  const headerItem = blocks.find((item) => item.type === BlockType.Header);
  const footerItem = blocks.find((item) => item.type === BlockType.Footer);
  const questions = blocks.filter((item) => item.type === BlockType.Question);

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
    let correct = 0;

    const getOptionKey = (opt: { id?: string }, index: number) =>
      opt.id || `${index}`;

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      const options = question.options ?? [];

      if (question.questionType === QuestionType.Single) {
        const correctIndex = options.findIndex((opt) => opt.isCorrectAnswer);
        if (correctIndex !== -1) {
          const correctKey = getOptionKey(options[correctIndex], correctIndex);
          if (userAnswer === correctKey) {
            correct++;
          }
        }
      } else if (question.questionType === QuestionType.Multi) {
        const correctKeys = options
          .map((opt, idx) =>
            opt.isCorrectAnswer ? getOptionKey(opt, idx) : null,
          )
          .filter((key): key is string => key !== null)
          .sort();
        const userAnswerKeys = Array.isArray(userAnswer)
          ? [...userAnswer].sort()
          : [];

        if (
          correctKeys.length === userAnswerKeys.length &&
          correctKeys.every((key, idx) => key === userAnswerKeys[idx])
        ) {
          correct++;
        }
      } else if (question.questionType === QuestionType.Text) {
        if (userAnswer && typeof userAnswer === "string" && userAnswer.trim()) {
          correct++;
        }
      }
    });

    return correct;
  }, [questions, answers]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Quiz not found.</p>
      </div>
    );
  }

  if (!quiz.publishedAt) {
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">No questions available in this quiz.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-2xl mx-auto">
        {headerItem && (
          <div className="mb-6">
            <Header title={headerItem.title || quiz.title} />
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentStep + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / totalQuestions) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <Question
            id={currentQuestion.id}
            order={currentStep + 1}
            type={currentQuestion.questionType || QuestionType.Single}
            title={currentQuestion.title}
            options={currentQuestion.options}
            value={answers[currentQuestion.id]}
            onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
            onClick={() => {}}
            isViewPage
          />
        </div>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handlePrevious}
            disabled={isFirstStep}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            endIcon={!isLastStep && <ArrowForwardIcon />}
            onClick={handleNext}
          >
            {isLastStep ? "Finish Quiz" : "Next"}
          </Button>
        </Box>

        {footerItem && (
          <div className="mt-6">
            <Footer footerItem={footerItem} />
          </div>
        )}
      </div>
    </div>
  );
}
