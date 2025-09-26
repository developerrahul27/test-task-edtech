"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  dob: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  user: srUser,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(srUser);
  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
