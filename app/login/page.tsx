
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion administrateur",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#d00018]">
            Espace privé
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Administration<span className="text-[#d00018]">.</span>
          </h1>

          <p className="mt-4 text-sm leading-6 text-neutral-400">
            Connecte-toi pour gérer tes demandes de collaboration.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Accès réservé à l’administrateur.
        </p>
      </div>
    </main>
  );
}
