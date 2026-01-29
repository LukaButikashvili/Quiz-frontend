import { DragHandleIcon, CheckCircleIcon } from "@/assets/icons";
import { cn } from "@/utils/cn";
import { BlockType } from "@/types";

const variantStyles: Record<
  BlockType,
  { color: string; bg: string; border: string }
> = {
  [BlockType.Header]: {
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "before:bg-amber-500",
  },
  [BlockType.Question]: {
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    border: "before:bg-indigo-500",
  },
  [BlockType.Footer]: {
    color: "text-gray-500",
    bg: "bg-gray-100",
    border: "before:bg-gray-500",
  },
};

interface BlockItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant: BlockType;
  isDragging?: boolean;
  isDisabled?: boolean;
}

function BlockItem({
  icon,
  title,
  description,
  variant,
  isDragging = false,
  isDisabled = false,
}: BlockItemProps) {
  const styles = variantStyles[variant] || variantStyles[BlockType.Question];

  if (isDisabled) {
    return (
      <div
        className={cn(
          "relative flex items-center gap-3 p-3.5 px-4 bg-gray-50 border border-gray-100 rounded-[10px] cursor-not-allowed overflow-hidden opacity-60",
        )}
      >
        <div
          className={cn(
            "shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100",
          )}
        >
          <div className="w-5 h-5 text-gray-400">{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-400 mb-0.5">
            {title}
          </div>
          <div className="text-xs text-gray-300">Already added</div>
        </div>
        <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 p-3.5 px-4 bg-white border border-gray-100 rounded-[10px] cursor-grab active:cursor-grabbing transition-all duration-200 ease-out hover:bg-gray-50 hover:border-gray-200 hover:shadow-sm hover:translate-x-0.75 active:scale-[0.98] overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.75 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100",
        styles.border,
        isDragging && "shadow-lg ring-2 ring-indigo-300 z-50",
      )}
    >
      <div
        className={cn(
          "shrink-0 w-9 h-9 flex items-center justify-center rounded-lg",
          styles.bg,
        )}
      >
        <div className={cn("w-5 h-5", styles.color)}>{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 mb-0.5">
          {title}
        </div>
        <div className="text-xs text-[#A1A1AA]">{description}</div>
      </div>
      <DragHandleIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200" />
    </div>
  );
}

export default BlockItem;
