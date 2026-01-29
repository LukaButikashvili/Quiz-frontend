import { HEADER_DEFAULT_STATE, FOOTER_DEFAULT_STATE } from "@/config/constants";
import { BlockType, QuestionType, type QuizItem } from "@/types";

// Generate unique ID
export const generateId = () =>
  `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Recalculate orders after reordering
export const recalculateOrders = (items: QuizItem[]): QuizItem[] => {
  let orderCounter = 2;
  return items.map((item) => {
    if (item.type === BlockType.Header) {
      return { ...item, order: 1 };
    }
    if (item.type === BlockType.Footer) {
      return { ...item, order: 999 };
    }
    const newItem = { ...item, order: orderCounter };
    orderCounter++;
    return newItem;
  });
};

// Create new item based on block type
export const createNewItem = (
  blockType: string,
  currentQuizLength: number,
): QuizItem | null => {
  const id = generateId();

  switch (blockType) {
    case BlockType.Header:
      return {
        id,
        ...HEADER_DEFAULT_STATE,
        order: 1,
      };
    case BlockType.Question:
      return {
        id,
        order: currentQuizLength,
        type: BlockType.Question,
        questionType: QuestionType.Single,
        title: "What is your question?",
        options: [
          { id: "1", label: "Option 1", isCorrectAnswer: false },
          { id: "2", label: "Option 2", isCorrectAnswer: false },
          { id: "3", label: "Option 3", isCorrectAnswer: false },
        ],
      };
    case BlockType.Footer:
      return {
        id,
        ...FOOTER_DEFAULT_STATE,
        order: 999,
      };
    default:
      return null;
  }
};

// Helper to check if item is draggable (Header and Footer are not)
export const isItemDraggable = (item: QuizItem) => {
  return item.type !== BlockType.Header && item.type !== BlockType.Footer;
};

// Type guards for value handling
export const getStringValue = (
  value: string | string[] | undefined,
): string => {
  if (typeof value === "string") return value;
  return "";
};

export const getArrayValue = (
  value: string | string[] | undefined,
): string[] => {
  if (Array.isArray(value)) return value;
  return [];
};
