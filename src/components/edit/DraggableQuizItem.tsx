"use client";

import {
  Draggable,
  type DraggableProvided,
  type DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { DragHandleIcon, DeleteIcon, LockIcon } from "@/assets/icons";
import { cn } from "@/utils/cn";

interface DraggableQuizItemProps {
  id: string;
  index: number;
  children: React.ReactNode;
  isDraggable?: boolean;
  onDelete?: (id: string) => void;
}

export default function DraggableQuizItem({
  id,
  index,
  children,
  isDraggable = true,
  onDelete,
}: DraggableQuizItemProps) {
  const content = (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot,
  ) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={cn(
        "relative transition-all duration-150",
        snapshot.isDragging ? "opacity-90 shadow-2xl z-50" : "opacity-100",
      )}
    >
      <div
        className={cn(
          "group relative bg-transparent",
          !isDraggable && "opacity-90",
        )}
      >
        {/* Controls Overlay */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {/* Drag Handle - only show if draggable */}
          {isDraggable ? (
            <button
              {...provided.dragHandleProps}
              aria-label="Drag to reorder"
              className="drag-handle p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
            >
              <DragHandleIcon className="w-4 h-4 text-gray-400" />
            </button>
          ) : (
            <div
              {...provided.dragHandleProps}
              className="p-1.5 bg-gray-100 border border-gray-200 rounded-lg shadow-sm"
              title="This item cannot be moved"
            >
              <LockIcon className="w-4 h-4 text-gray-400" />
            </div>
          )}

          {/* Delete Button */}
          {onDelete && (
            <button
              aria-label="Delete item"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="cursor-pointer p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-red-300 hover:bg-red-50 transition-colors"
            >
              <DeleteIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!isDraggable}>
      {content}
    </Draggable>
  );
}
