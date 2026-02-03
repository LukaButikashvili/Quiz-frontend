import type { StateCreator } from "zustand";
import type { DropResult } from "@hello-pangea/dnd";
import { recalculateOrders, createNewItem } from "@/utils";
import { BlockType, type QuizItem } from "@/types";
import type { QuizMetaSlice } from "./quizMetaSlice";

export interface QuizBlocksSlice {
  blocks: QuizItem[];
  selectedBlock: QuizItem | null;

  setBlocks: (blocks: QuizItem[]) => void;
  selectBlock: (item: QuizItem | null) => void;
  addBlock: (blockType: BlockType, destinationIndex?: number) => void;
  deleteBlock: (id: string) => void;
  reorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  handleDragEnd: (result: DropResult) => void;
  updateBlock: (id: string, updates: Partial<QuizItem>) => void;
  saveBlock: (item: QuizItem) => void;

  getHasHeader: () => boolean;
  getHasFooter: () => boolean;
  getDisabledBlocks: () => BlockType[];
}

const getDraggableItems = (blocks: QuizItem[]) =>
  blocks.filter(
    (item) => item.type !== BlockType.Header && item.type !== BlockType.Footer,
  );

export const createQuizBlocksSlice: StateCreator<
  QuizMetaSlice & QuizBlocksSlice,
  [],
  [],
  QuizBlocksSlice
> = (set, get) => ({
  blocks: [],
  selectedBlock: null,

  getHasHeader: () => {
    const { blocks } = get();
    return blocks.some((item) => item.type === BlockType.Header);
  },

  getHasFooter: () => {
    const { blocks } = get();
    return blocks.some((item) => item.type === BlockType.Footer);
  },

  getDisabledBlocks: () => {
    const { getHasHeader, getHasFooter } = get();
    const hasHeader = getHasHeader();
    const hasFooter = getHasFooter();
    return [
      ...(hasHeader ? [BlockType.Header] : []),
      ...(hasFooter ? [BlockType.Footer] : []),
    ];
  },

  setBlocks: (blocks) => set({ blocks }),

  selectBlock: (item) => set({ selectedBlock: item }),

  addBlock: (blockType, destinationIndex) => {
    const { blocks } = get();
    const newItem = createNewItem(blockType, blocks.length);

    if (!newItem) return;

    if (newItem.type === BlockType.Header) {
      const newBlocks = recalculateOrders([newItem, ...blocks]);
      set({ blocks: newBlocks });
    } else if (newItem.type === BlockType.Footer) {
      const newBlocks = recalculateOrders([...blocks, newItem]);
      set({ blocks: newBlocks });
    } else {
      const headerItem = blocks.find((item) => item.type === BlockType.Header);
      const footerItem = blocks.find((item) => item.type === BlockType.Footer);
      const draggableItems = getDraggableItems(blocks);

      const newDraggableItems = [...draggableItems];
      const insertIndex = destinationIndex ?? draggableItems.length;
      newDraggableItems.splice(insertIndex, 0, newItem);

      const newBlocks: QuizItem[] = [];
      if (headerItem) newBlocks.push(headerItem);
      newBlocks.push(...newDraggableItems);
      if (footerItem) newBlocks.push(footerItem);

      set({ blocks: recalculateOrders(newBlocks) });
    }
  },

  deleteBlock: (id) => {
    const { blocks, selectedBlock } = get();
    const filteredBlocks = blocks.filter((item) => item.id !== id);
    set({
      blocks: recalculateOrders(filteredBlocks),
      selectedBlock: selectedBlock?.id === id ? null : selectedBlock,
    });
  },

  reorderBlocks: (sourceIndex, destinationIndex) => {
    const { blocks } = get();
    const headerItem = blocks.find((item) => item.type === BlockType.Header);
    const footerItem = blocks.find((item) => item.type === BlockType.Footer);
    const draggableItems = getDraggableItems(blocks);

    const newDraggableItems = [...draggableItems];
    const [removed] = newDraggableItems.splice(sourceIndex, 1);
    newDraggableItems.splice(destinationIndex, 0, removed);

    const newBlocks: QuizItem[] = [];
    if (headerItem) newBlocks.push(headerItem);
    newBlocks.push(...newDraggableItems);
    if (footerItem) newBlocks.push(footerItem);

    set({ blocks: recalculateOrders(newBlocks) });
  },

  handleDragEnd: (result) => {
    const { source, destination, draggableId } = result;
    const { addBlock, reorderBlocks } = get();

    if (!destination) return;
    if (destination.droppableId === "sidebar") return;

    if (
      source.droppableId === "sidebar" &&
      destination.droppableId === "canvas"
    ) {
      const blockType = draggableId.replace("sidebar-", "");
      const validBlockTypes = Object.values(BlockType);
      if (!validBlockTypes.includes(blockType as BlockType)) {
        console.error(`Invalid block type: ${blockType}`);
        return;
      }
      addBlock(blockType as BlockType, destination.index);
      return;
    }

    if (
      source.droppableId === "canvas" &&
      destination.droppableId === "canvas"
    ) {
      reorderBlocks(source.index, destination.index);
    }
  },

  updateBlock: (id, updates) => {
    const { blocks, selectedBlock } = get();
    const updatedBlocks = blocks.map((item) =>
      item.id === id ? { ...item, ...updates } : item,
    );
    set({
      blocks: updatedBlocks,
      selectedBlock:
        selectedBlock?.id === id
          ? { ...selectedBlock, ...updates }
          : selectedBlock,
    });
  },

  saveBlock: (item) => {
    const { blocks } = get();
    const updatedBlocks = blocks.map((b) => (b.id === item.id ? item : b));
    set({
      blocks: updatedBlocks,
      selectedBlock: item,
    });
  },
});
