import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",

  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold tracking-tight">
          Connexion
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Connectez-vous à votre espace.
        </p>
      </div>
    </main>
  );
}