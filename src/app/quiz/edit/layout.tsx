import { Navigation } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Quiz",
  description: "Edit Quiz",
};

export default function EditQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="h-[calc(100vh-65px)]">{children}</main>
    </div>
  );
}
