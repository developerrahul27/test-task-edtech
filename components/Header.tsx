"use client";

import { useAuth } from "@/context/auth-context";
import { User } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./theme-modal";
import { Avatar } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/app/actions/auth";

export default function Header() {
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    setUser(null)
    await logout()
  }

  return (
    <header className="relative border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm glass-effect backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            ProjectTracker
          </Link>

          <nav className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium">
            <Link
              href="/dashboard"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Projects
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                {user ? (
                  <span className="flex items-center justify-center w-full h-full text-lg font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-lg font-semibold">
                    <User />
                  </div>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="dark:text-gray-200">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="dark:text-gray-200">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/projects" className="dark:text-gray-200">
                      Projects
                    </Link>
                  </DropdownMenuItem>
                  <form action={handleLogout}>
                    <DropdownMenuItem asChild>
                      <button type="submit" className="w-full text-left dark:text-gray-200">
                        Logout
                      </button>
                    </DropdownMenuItem>
                  </form>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="dark:text-gray-200">
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="dark:text-gray-200">
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
