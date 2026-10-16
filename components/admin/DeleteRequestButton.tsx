"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { deleteRequest } from "@/app/admin/actions";

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-[#d00018] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#b60015] disabled:opacity-60"
    >
      {pending ? "Suppression…" : "Confirmer la suppression"}
    </button>
  );
}

// Suppression en deux temps : un premier clic demande confirmation.
export default function DeleteRequestButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-full border border-red-900/60 px-4 py-2 text-xs font-medium text-red-300 transition-colors hover:border-red-500 hover:text-red-200"
      >
        Supprimer la demande
      </button>
    );
  }

  return (
    <form action={deleteRequest} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="id" value={id} />
      <p role="alert" className="text-xs text-red-300">
        Suppression définitive.
      </p>
      <ConfirmButton />
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="rounded-full border border-[#2a2a2a] px-4 py-2 text-xs text-neutral-300 hover:border-neutral-500"
      >
        Annuler
      </button>
    </form>
  );
}
