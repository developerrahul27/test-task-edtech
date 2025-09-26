"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProjectDetailsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Project details page error:", error);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/projects">
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <Card className="p-12 text-center">
        <div className="space-y-6">
          <div className="mx-auto h-20 w-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              We encountered an error while loading this project. This might be a temporary issue.
            </p>
          </div>

          {process.env.NODE_ENV === "development" && (
            <Card className="p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <div className="text-left">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Error Details:</h3>
                <p className="text-sm text-red-700 dark:text-red-300 font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            </Card>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              className="bg-gradient-primary hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Link href="/projects">
              <Button
                variant="outline"
                className="hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
