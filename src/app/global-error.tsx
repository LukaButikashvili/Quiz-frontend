"use client";

import { Button } from "@mui/material";
import Link from "next/link";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">⚠️</span>
            </div>

            <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">
              Error
            </p>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Something went wrong
            </h1>

            <p className="text-gray-500 mb-8">
              Our team has been notified. Please try again later.
            </p>

            <Link href="/">
              <Button variant="contained">Go back home</Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
