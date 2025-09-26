"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileX, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-orange-600/5 animate-gradient"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative w-full max-w-md">
        <Card className="glass-effect border-0 shadow-2xl p-8 space-y-6 animate-scale-in">
          <div className="text-center space-y-6">
            <div className="mx-auto h-20 w-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <FileX className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Page Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="bg-gradient-primary hover:scale-105 transition-all duration-300 text-white font-semibold shadow-lg hover:shadow-xl">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
