import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
          Loading...
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please wait while we fetch your content.
        </p>
      </div>
    </div>
  );
}
