"use client";

import { useFormStatus } from "react-dom";

import { resendPaymentLink } from "@/app/(private)/admin/paiements/actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="shrink-0 rounded-full border border-[#2a2a2a] px-4 py-2 text-xs whitespace-nowrap text-neutral-200 transition-colors hover:border-neutral-500 disabled:opacity-60"
    >
      {pending ? "Envoi…" : label}
    </button>
  );
}

// Envoie (ou renvoie) le lien de paiement au client par email.
export default function SendPaymentLinkButton({ id, label }: { id: string; label: string }) {
  return (
    <form action={resendPaymentLink}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton label={label} />
    </form>
  );
}
