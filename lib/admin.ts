import { redirect } from "next/navigation";

import { auth } from "@/auth";

// Contrôle d'accès des pages et actions serveur de l'admin.
export async function requireAdmin() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    redirect("/login");
  }

  return session;
}
