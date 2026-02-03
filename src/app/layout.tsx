import "@styles/tailwind.css";
import type { Metadata } from "next";
import { QueryProvider, ThemeProvider } from "@/providers";
import { Toaster } from "react-hot-toast";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Quiz Landing",
  description: "Quiz application Landing Page",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
