import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
