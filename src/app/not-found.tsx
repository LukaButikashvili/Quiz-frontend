import { Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <p className="text-3xl font-semibold text-indigo-600 uppercase tracking-wide mb-2">
          404
        </p>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Page not found
        </h1>

        <p className="text-gray-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link href="/">
          <Button variant="contained">Go back home page</Button>
        </Link>
      </div>
    </div>
  );
}
