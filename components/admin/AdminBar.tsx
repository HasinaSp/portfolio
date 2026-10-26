import Link from "next/link";

import { logout } from "@/app/(private)/admin/actions";

export default function AdminBar({ email }: { email?: string | null }) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#1f1f1f] pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link
          href="/admin"
          className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]"
        >
          Administration
        </Link>
        {email && (
          <p className="mt-1 text-xs text-neutral-500">Connecté : {email}</p>
        )}
        <nav aria-label="Administration" className="mt-4 flex gap-2">
          <Link
            href="/admin"
            className="rounded-full border border-[#2a2a2a] px-4 py-2 text-xs text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
          >
            Demandes
          </Link>
          <Link
            href="/admin/paiements"
            className="rounded-full border border-[#2a2a2a] px-4 py-2 text-xs text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
          >
            Paiements
          </Link>
        </nav>
      </div>

      <form action={logout}>
        <button
          type="submit"
          className="rounded-full border border-[#2a2a2a] px-4 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-[#d00018] hover:text-white"
        >
          Se déconnecter
        </button>
      </form>
    </div>
  );
}
