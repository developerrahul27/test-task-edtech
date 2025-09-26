import { Card } from "@/components/ui/card";

export default function RegisterLoading() {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 animate-gradient"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative w-full max-w-md">
        <Card className="glass-effect border-0 shadow-2xl p-8 space-y-6 animate-scale-in">
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div className="text-center pt-4">
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
