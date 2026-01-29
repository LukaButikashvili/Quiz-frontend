import { DeleteIcon, LockIcon } from "@/assets/icons";

interface StaticItemWrapperProps {
  id: string;
  children: React.ReactNode;
  onDelete?: (id: string) => void;
  onClick?: () => void;
}

function StaticItemWrapper({
  id,
  children,
  onDelete,
  onClick,
}: StaticItemWrapperProps) {
  return (
    <div onClick={onClick}>
      <div className="group relative bg-transparent opacity-90">
        {/* Controls Overlay */}
        <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {/* Lock Icon */}
          <div
            className="p-1.5 bg-gray-100 border border-gray-200 rounded-lg shadow-sm"
            title="This item cannot be moved"
          >
            <LockIcon className="w-4 h-4 text-gray-400" />
          </div>

          {/* Delete Button */}
          {onDelete && (
            <button
              aria-label="Delete item"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-red-300 hover:bg-red-50 transition-colors"
            >
              <DeleteIcon className="w-4 h-4 text-gray-400 hover:text-red-500" />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

export default StaticItemWrapper;
