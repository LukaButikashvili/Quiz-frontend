import { cn } from "@/utils/cn";

interface SidebarProps {
  title: string;
  position?: "left" | "right";
  children: React.ReactNode;
}

function Sidebar({ title, position = "left", children }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col p-5 bg-white border-gray-200 h-[calc(100vh-65px)] overflow-y-auto",
        position === "left" ? "border-r" : "border-l"
      )}
    >
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
          {title}
        </h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      {children}
    </aside>
  );
}

export default Sidebar;
