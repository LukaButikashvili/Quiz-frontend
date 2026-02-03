import {
  calculateQuizScore,
  getScorePercentage,
  getScoreMessage,
  getScoreColor,
  getScoreProgressColor,
} from "@/utils";
import { BlockType, QuestionType, type QuizItem } from "@/types";

describe("calculateQuizScore", () => {
  const createQuestion = (
    id: string,
    questionType: QuestionType,
    options?: { id: string; label: string; isCorrectAnswer: boolean }[],
  ): QuizItem => ({
    id,
    type: BlockType.Question,
    order: 1,
    title: `Question ${id}`,
    questionType,
    options,
  });

  describe("single choice questions", () => {
    it("should return 1 for correct single answer", () => {
      const questions = [
        createQuestion("q1", QuestionType.Single, [
          { id: "a", label: "A", isCorrectAnswer: true },
          { id: "b", label: "B", isCorrectAnswer: false },
        ]),
      ];
      const answers = { q1: "a" };
      expect(calculateQuizScore(questions, answers)).toBe(1);
    });

    it("should return 0 for incorrect single answer", () => {
      const questions = [
        createQuestion("q1", QuestionType.Single, [
          { id: "a", label: "A", isCorrectAnswer: true },
          { id: "b", label: "B", isCorrectAnswer: false },
        ]),
      ];
      const answers = { q1: "b" };
      expect(calculateQuizScore(questions, answers)).toBe(0);
    });

    it("should return 0 for missing answer", () => {
      const questions = [
        createQuestion("q1", QuestionType.Single, [
          { id: "a", label: "A", isCorrectAnswer: true },
        ]),
      ];
      const answers = {};
      expect(calculateQuizScore(questions, answers)).toBe(0);
    });
  });

  describe("multiple choice questions", () => {
    it("should return 1 when all correct options are selected", () => {
      const questions = [
        createQuestion("q1", QuestionType.Multi, [
          { id: "a", label: "A", isCorrectAnswer: true },
          { id: "b", label: "B", isCorrectAnswer: true },
          { id: "c", label: "C", isCorrectAnswer: false },
        ]),
      ];
      const answers = { q1: ["a", "b"] };
      expect(calculateQuizScore(questions, answers)).toBe(1);
    });

    it("should return 1 regardless of answer order", () => {
      const questions = [
        createQuestion("q1", QuestionType.Multi, [
          { id: "a", label: "A", isCorrectAnswer: true },
          { id: "b", label: "B", isCorrectAnswer: true },
        ]),
      ];
      const answers = { q1: ["b", "a"] };
      expect(calculateQuizScore(questions, answers)).toBe(1);
    });

    it("should return 0 when only some correct options are selected", () => {
      const questions = [
        createQuestion("q1", QuestionType.Multi, [
          { id: "a", label: "A", isCorrectAnswer: true },
          { id: "b", label: "B", isCorrectAnswer: true },
        ]),
      ];
      const answers = { q1: ["a"] };
      expect(calculateQuizScore(questions, answers)).toBe(0);
    });

    it("should return 0 when incorrect options are selected", () => {
      const questions = [
        createQuestion("q1", QuestionType.Multi, [
          { id: "a", label: "A", isCorrectAnswer: true },
          { id: "b", label: "B", isCorrectAnswer: false },
        ]),
      ];
      const answers = { q1: ["a", "b"] };
      expect(calculateQuizScore(questions, answers)).toBe(0);
    });
  });

  describe("text questions", () => {
    it("should return 1 for non-empty text answer", () => {
      const questions = [createQuestion("q1", QuestionType.Text)];
      const answers = { q1: "some answer" };
      expect(calculateQuizScore(questions, answers)).toBe(1);
    });

    it("should return 0 for empty text answer", () => {
      const questions = [createQuestion("q1", QuestionType.Text)];
      const answers = { q1: "   " };
      expect(calculateQuizScore(questions, answers)).toBe(0);
    });

    it("should return 0 for missing text answer", () => {
      const questions = [createQuestion("q1", QuestionType.Text)];
      const answers = {};
      expect(calculateQuizScore(questions, answers)).toBe(0);
    });
  });

  describe("mixed questions", () => {
    it("should calculate correct total score", () => {
      const questions = [
        createQuestion("q1", QuestionType.Single, [
          { id: "a", label: "A", isCorrectAnswer: true },
        ]),
        createQuestion("q2", QuestionType.Multi, [
          { id: "a", label: "A", isCorrectAnswer: true },
          { id: "b", label: "B", isCorrectAnswer: true },
        ]),
        createQuestion("q3", QuestionType.Text),
      ];
      const answers = {
        q1: "a",
        q2: ["a", "b"],
        q3: "answer",
      };
      expect(calculateQuizScore(questions, answers)).toBe(3);
    });
  });
});

describe("getScorePercentage", () => {
  it("should calculate percentage correctly", () => {
    expect(getScorePercentage(5, 10)).toBe(50);
    expect(getScorePercentage(3, 4)).toBe(75);
    expect(getScorePercentage(10, 10)).toBe(100);
  });

  it("should return 0 for zero total", () => {
    expect(getScorePercentage(0, 0)).toBe(0);
  });

  it("should round to nearest integer", () => {
    expect(getScorePercentage(1, 3)).toBe(33);
    expect(getScorePercentage(2, 3)).toBe(67);
  });
});

describe("getScoreMessage", () => {
  it("should return 'Perfect Score!' for 100%", () => {
    expect(getScoreMessage(100)).toBe("Perfect Score!");
  });

  it("should return 'Great Job!' for 80-99%", () => {
    expect(getScoreMessage(80)).toBe("Great Job!");
    expect(getScoreMessage(99)).toBe("Great Job!");
  });

  it("should return 'Good Effort!' for 60-79%", () => {
    expect(getScoreMessage(60)).toBe("Good Effort!");
    expect(getScoreMessage(79)).toBe("Good Effort!");
  });

  it("should return 'Keep Practicing!' for 40-59%", () => {
    expect(getScoreMessage(40)).toBe("Keep Practicing!");
    expect(getScoreMessage(59)).toBe("Keep Practicing!");
  });

  it("should return 'Better Luck Next Time!' for below 40%", () => {
    expect(getScoreMessage(39)).toBe("Better Luck Next Time!");
    expect(getScoreMessage(0)).toBe("Better Luck Next Time!");
  });
});

describe("getScoreColor", () => {
  it("should return emerald for 80% and above", () => {
    expect(getScoreColor(80)).toBe("text-emerald-600");
    expect(getScoreColor(100)).toBe("text-emerald-600");
  });

  it("should return amber for 60-79%", () => {
    expect(getScoreColor(60)).toBe("text-amber-500");
    expect(getScoreColor(79)).toBe("text-amber-500");
  });

  it("should return red for below 60%", () => {
    expect(getScoreColor(59)).toBe("text-red-500");
    expect(getScoreColor(0)).toBe("text-red-500");
  });
});

describe("getScoreProgressColor", () => {
  it("should return emerald for 80% and above", () => {
    expect(getScoreProgressColor(80)).toBe("bg-emerald-500");
    expect(getScoreProgressColor(100)).toBe("bg-emerald-500");
  });

  it("should return amber for 60-79%", () => {
    expect(getScoreProgressColor(60)).toBe("bg-amber-500");
    expect(getScoreProgressColor(79)).toBe("bg-amber-500");
  });

  it("should return red for below 60%", () => {
    expect(getScoreProgressColor(59)).toBe("bg-red-500");
    expect(getScoreProgressColor(0)).toBe("bg-red-500");
  });
});
