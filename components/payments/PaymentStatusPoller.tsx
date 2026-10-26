"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const INTERVAL_MS = 3000;
const MAX_ATTEMPTS = 20; // ~1 minute

// Retour de Lemon Squeezy avant l'arrivée du webhook : recharge les données
// de la page toutes les 3 s jusqu'à ce que le statut change (la page serveur
// cesse alors d'afficher ce composant).
export default function PaymentStatusPoller({
  pendingText,
  slowText,
}: {
  pendingText: string;
  slowText: string;
}) {
  const router = useRouter();
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (attempts >= MAX_ATTEMPTS) return;
    const timer = setTimeout(() => {
      router.refresh();
      setAttempts((value) => value + 1);
    }, INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [attempts, router]);

  const slow = attempts >= MAX_ATTEMPTS;

  return (
    <p role="status" className="flex items-center gap-3 text-sm leading-6 text-neutral-300">
      {!slow && (
        <span
          aria-hidden="true"
          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-neutral-600 border-t-[#d00018]"
        />
      )}
      {slow ? slowText : pendingText}
    </p>
  );
}
