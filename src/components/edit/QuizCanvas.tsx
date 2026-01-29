"use client";

import { Droppable } from "@hello-pangea/dnd";
import {
  Header,
  Question,
  Footer,
  StaticItemWrapper,
} from "@/components/shared";
import DraggableQuizItem from "./DraggableQuizItem";
import EmptyCanvasPlaceholder from "./EmptyCanvasPlaceholder";
import { BlockType, QuestionType, type QuizItem } from "@/types";
import { cn } from "@/utils/cn";

interface QuizCanvasProps {
  quiz: QuizItem[];
  onDeleteItem: (id: string) => void;
  onSelectQuiz: (quiz: QuizItem) => void;
  isItemDraggable: (item: QuizItem) => boolean;
}

export default function QuizCanvas({
  quiz,
  onDeleteItem,
  onSelectQuiz,
  isItemDraggable,
}: QuizCanvasProps) {
  // Separate header, footer, and draggable items
  const headerItem = quiz.find((item) => item.type === BlockType.Header);
  const footerItem = quiz.find((item) => item.type === BlockType.Footer);
  const draggableItems = quiz.filter(
    (item) => item.type !== BlockType.Header && item.type !== BlockType.Footer,
  );

  // Create index map for draggable items only
  const draggableItemsWithIndex = draggableItems.map((item, index) => ({
    item,
    index,
  }));

  const isEmpty = quiz.length === 0;

  return (
    <div className="flex-1 overflow-auto py-10 px-12 min-w-[600px]">
      <div className="flex flex-col gap-3 mx-auto transition-all rounded-lg">
        {headerItem && (
          <StaticItemWrapper
            id={headerItem.id}
            onDelete={onDeleteItem}
            onClick={() => onSelectQuiz(headerItem)}
          >
            <Header title={headerItem.title || ""} />
          </StaticItemWrapper>
        )}

        <Droppable droppableId="canvas">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "flex flex-col gap-3 min-h-[100px] transition-all rounded-lg",
                snapshot.isDraggingOver &&
                  "bg-indigo-50/30 border-2 border-dashed border-indigo-300 p-4",
                isEmpty && "flex-1",
              )}
            >
              {isEmpty && !snapshot.isDraggingOver && (
                <EmptyCanvasPlaceholder />
              )}
              {draggableItemsWithIndex.map(({ item, index }) => (
                <DraggableQuizItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  isDraggable={isItemDraggable(item)}
                  onDelete={onDeleteItem}
                >
                  {item.type === BlockType.Question && (
                    <Question
                      type={item.questionType || QuestionType.Single}
                      id={item.id}
                      order={(item.order as number) || 0}
                      title={item.title || ""}
                      options={item.options || []}
                      onChange={() => {}}
                      onClick={() => {
                        onSelectQuiz(item);
                      }}
                    />
                  )}
                </DraggableQuizItem>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {footerItem && (
          <StaticItemWrapper
            id={footerItem.id}
            onDelete={onDeleteItem}
            onClick={() => onSelectQuiz(footerItem)}
          >
            <Footer footerItem={footerItem} />
          </StaticItemWrapper>
        )}
      </div>
    </div>
  );
}
