import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { getCurrentUser } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata = {
  title: "Project Tracker",
  description: "Manage projects easily with Next.js, MongoDB & scdcn-ui",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider user={user}>
              <Header />
              <ErrorBoundary>
                <main className="flex-1">
                  {children}
                </main>
              </ErrorBoundary>
              <Toaster />
              <Footer />
            </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
