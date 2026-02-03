import {
  generateId,
  recalculateOrders,
  createNewItem,
  isItemDraggable,
  getStringValue,
  getArrayValue,
} from "@/utils";
import { BlockType, QuestionType, type QuizItem } from "@/types";

describe("generateId", () => {
  it("should generate a unique id", () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  it("should generate id in expected format", () => {
    const id = generateId();
    expect(id).toMatch(/^\d+_[a-z0-9]+$/);
  });
});

describe("recalculateOrders", () => {
  it("should assign order 1 to header items", () => {
    const items: QuizItem[] = [
      { id: "1", type: BlockType.Header, order: 5, title: "Header" },
    ];
    const result = recalculateOrders(items);
    expect(result[0].order).toBe(1);
  });

  it("should assign order 999 to footer items", () => {
    const items: QuizItem[] = [
      { id: "1", type: BlockType.Footer, order: 5, title: "Footer" },
    ];
    const result = recalculateOrders(items);
    expect(result[0].order).toBe(999);
  });

  it("should assign sequential orders to question items starting from 2", () => {
    const items: QuizItem[] = [
      {
        id: "1",
        type: BlockType.Question,
        order: 10,
        title: "Q1",
        questionType: QuestionType.Single,
      },
      {
        id: "2",
        type: BlockType.Question,
        order: 20,
        title: "Q2",
        questionType: QuestionType.Single,
      },
    ];
    const result = recalculateOrders(items);
    expect(result[0].order).toBe(2);
    expect(result[1].order).toBe(3);
  });

  it("should handle mixed block types", () => {
    const items: QuizItem[] = [
      { id: "1", type: BlockType.Header, order: 1, title: "Header" },
      {
        id: "2",
        type: BlockType.Question,
        order: 2,
        title: "Q1",
        questionType: QuestionType.Single,
      },
      { id: "3", type: BlockType.Footer, order: 3, title: "Footer" },
    ];
    const result = recalculateOrders(items);
    expect(result[0].order).toBe(1);
    expect(result[1].order).toBe(2);
    expect(result[2].order).toBe(999);
  });

  it("should return empty array for empty input", () => {
    expect(recalculateOrders([])).toEqual([]);
  });
});

describe("createNewItem", () => {
  it("should create a header item", () => {
    const item = createNewItem(BlockType.Header, 0);
    expect(item).not.toBeNull();
    expect(item?.type).toBe(BlockType.Header);
    expect(item?.order).toBe(1);
  });

  it("should create a footer item", () => {
    const item = createNewItem(BlockType.Footer, 0);
    expect(item).not.toBeNull();
    expect(item?.type).toBe(BlockType.Footer);
    expect(item?.order).toBe(999);
  });

  it("should create a question item with default options", () => {
    const item = createNewItem(BlockType.Question, 3);
    expect(item).not.toBeNull();
    expect(item?.type).toBe(BlockType.Question);
    expect(item?.questionType).toBe(QuestionType.Single);
    expect(item?.options).toHaveLength(3);
    expect(item?.order).toBe(3);
  });

  it("should generate unique ids for new items", () => {
    const item1 = createNewItem(BlockType.Question, 0);
    const item2 = createNewItem(BlockType.Question, 0);
    expect(item1?.id).not.toBe(item2?.id);
  });
});

describe("isItemDraggable", () => {
  it("should return false for header items", () => {
    const item: QuizItem = {
      id: "1",
      type: BlockType.Header,
      order: 1,
      title: "Header",
    };
    expect(isItemDraggable(item)).toBe(false);
  });

  it("should return false for footer items", () => {
    const item: QuizItem = {
      id: "1",
      type: BlockType.Footer,
      order: 999,
      title: "Footer",
    };
    expect(isItemDraggable(item)).toBe(false);
  });

  it("should return true for question items", () => {
    const item: QuizItem = {
      id: "1",
      type: BlockType.Question,
      order: 2,
      title: "Question",
      questionType: QuestionType.Single,
    };
    expect(isItemDraggable(item)).toBe(true);
  });
});

describe("getStringValue", () => {
  it("should return string value as is", () => {
    expect(getStringValue("hello")).toBe("hello");
  });

  it("should return empty string for array value", () => {
    expect(getStringValue(["a", "b"])).toBe("");
  });

  it("should return empty string for undefined", () => {
    expect(getStringValue(undefined)).toBe("");
  });
});

describe("getArrayValue", () => {
  it("should return array value as is", () => {
    expect(getArrayValue(["a", "b"])).toEqual(["a", "b"]);
  });

  it("should return empty array for string value", () => {
    expect(getArrayValue("hello")).toEqual([]);
  });

  it("should return empty array for undefined", () => {
    expect(getArrayValue(undefined)).toEqual([]);
  });
});
