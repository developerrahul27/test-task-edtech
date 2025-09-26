import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { ArrowRight, Sparkles, Shield, Zap, Users, Target, TrendingUp } from "lucide-react";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-gradient"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        
        <div className="relative flex flex-col items-center justify-center text-center p-8 pt-20 pb-32 space-y-12">
          {/* Main Heading */}
          <div className="animate-slide-up space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Welcome to{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Project Tracker
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
              Transform your project management with AI-powered insights, 
              beautiful design, and seamless collaboration.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-bounce-in flex flex-col sm:flex-row gap-6">
            {user ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-primary hover:scale-105 transition-all duration-300 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button size="lg" className="bg-gradient-primary hover:scale-105 transition-all duration-300 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Project Tracker?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built with modern technology and designed for the future of project management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover-lift animate-scale-in">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Smart Project Management
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Create, edit, and track projects with an intuitive interface designed for modern workflows.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                AI-Powered Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Get intelligent suggestions for project descriptions, status updates, and next steps.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Enterprise Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                JWT authentication with HttpOnly cookies ensures your data stays secure and private.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Built with Next.js 15 and optimized for performance with server-side rendering.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover-lift animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-cool rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                User-Centric Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Beautiful, responsive interface that works perfectly on all devices and screen sizes.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover-lift animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Real-time Updates
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Stay on top of your projects with instant updates and seamless state management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Built for Modern Teams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="text-4xl font-bold">100%</div>
                <div className="text-blue-100">Secure</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">24/7</div>
                <div className="text-blue-100">Available</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold">∞</div>
                <div className="text-blue-100">Scalable</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
