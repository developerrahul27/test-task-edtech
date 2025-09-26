import { FC } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer: FC = () => {
  return (
    <footer className="w-full border-t border-gray-200/50 dark:border-gray-700/50 py-8 mt-12 glass-effect backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Project Tracker</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A modern, AI-powered project management application built with Next.js 15, 
              MongoDB, and cutting-edge web technologies.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Features</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• AI-powered project suggestions</li>
              <li>• Secure JWT authentication</li>
              <li>• Real-time project management</li>
              <li>• Responsive design</li>
              <li>• Dark mode support</li>
            </ul>
          </div>

          {/* Developer Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Rahul Rawat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full-stack developer passionate about creating innovative web applications 
              with modern technologies and AI integration.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/developerrahul27"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rahul-rawattw-788b14368"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:rahulrawattw@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Project Tracker. All rights reserved.</p>
          <p>Built with ❤️ using Next.js 15, MongoDB, and AI</p>
        </div>
      </div>
    </footer>
  );
};
