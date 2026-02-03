"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
import { BUILDING_BLOCKS } from "@/config";
import { Sidebar } from "@/components/ui";
import BlockItem from "./BlockItem";

interface BuildingBlocksSidebarProps {
  disabledBlocks?: string[];
}

function BuildingBlocksSidebar({
  disabledBlocks = [],
}: BuildingBlocksSidebarProps) {
  return (
    <div className="max-w-[320px]">
      <Sidebar position="left" title="Building Blocks">
        <Droppable
          droppableId="sidebar"
          isDropDisabled={true}
          renderClone={(provided, snapshot, rubric) => {
            const block = BUILDING_BLOCKS[rubric.source.index];
            const IconComponent = block.icon;
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <BlockItem
                  icon={<IconComponent className="w-5 h-5" />}
                  title={block.title}
                  description={block.description}
                  variant={block.variant}
                  isDragging={snapshot.isDragging}
                />
              </div>
            );
          }}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-2 py-5"
            >
              {BUILDING_BLOCKS.map((block, index) => {
                const IconComponent = block.icon;
                const isDisabled = disabledBlocks.includes(block.variant);
                return (
                  <Draggable
                    key={block.variant}
                    draggableId={`sidebar-${block.variant}`}
                    index={index}
                    isDragDisabled={isDisabled}
                  >
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                      >
                        <BlockItem
                          icon={<IconComponent className="w-5 h-5" />}
                          title={block.title}
                          description={block.description}
                          variant={block.variant}
                          isDragging={draggableSnapshot.isDragging}
                          isDisabled={isDisabled}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Sidebar>
    </div>
  );
}

export default BuildingBlocksSidebar;
