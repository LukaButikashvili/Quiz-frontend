"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import { Sidebar } from "@/components/ui";
import { isItemDraggable } from "@/utils";
import { useQuizStore } from "@/store";
import QuizCanvas from "./QuizCanvas";
import BuildingBlocksSidebar from "./BuildingBlockSidebar";
import QuestionBlockEditor from "./QuestionBlockEditor";
import { useEffect } from "react";
import type { Quiz } from "@/types";

interface QuizEditorProps {
  initialQuiz?: Quiz | null;
}

export default function QuizEditor({ initialQuiz }: QuizEditorProps) {
  const {
    blocks,
    selectedBlock,
    getDisabledBlocks,
    selectBlock,
    deleteBlock,
    handleDragEnd,
    saveBlock,
    hydrateFromQuiz,
    resetStore,
  } = useQuizStore();

  useEffect(() => {
    if (initialQuiz) {
      hydrateFromQuiz(initialQuiz);
    }
  }, [initialQuiz, hydrateFromQuiz]);

  useEffect(() => {
    return () => {
      resetStore();
    };
  }, [resetStore]);

  const disabledBlocks = getDisabledBlocks();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-full">
        <BuildingBlocksSidebar disabledBlocks={disabledBlocks} />

        <QuizCanvas
          quiz={blocks}
          onDeleteItem={deleteBlock}
          onSelectQuiz={selectBlock}
          isItemDraggable={isItemDraggable}
        />

        <div className="w-[400px]">
          <Sidebar position="left" title="Edit Block">
            {selectedBlock ? (
              <QuestionBlockEditor
                key={selectedBlock.id}
                quizItem={selectedBlock}
                onDelete={deleteBlock}
                onSave={saveBlock}
              />
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>Select a block to edit</p>
              </div>
            )}
          </Sidebar>
        </div>
      </div>
    </DragDropContext>
  );
}
