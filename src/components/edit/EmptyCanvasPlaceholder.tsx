"use client";

import { UploadIcon } from "@/assets/icons";

export default function EmptyCanvasPlaceholder() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="text-center text-gray-400">
        <UploadIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium">Drag and drop blocks here</p>
        <p className="text-sm mt-1">Start building your quiz</p>
      </div>
    </div>
  );
}
