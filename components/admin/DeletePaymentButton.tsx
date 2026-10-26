"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

import { deletePayment } from "@/app/(private)/admin/paiements/actions";

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

// Suppression en deux temps : le lien envoyé au client ne fonctionnera plus.
export default function DeletePaymentButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-full border border-red-900/60 px-4 py-2 text-xs font-medium text-red-300 transition-colors hover:border-red-500 hover:text-red-200"
      >
        Supprimer le paiement
      </button>
    );
  }

  return (
    <form action={deletePayment} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="id" value={id} />
      <p role="alert" className="text-xs text-red-300">
        Le lien envoyé au client ne fonctionnera plus.
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
