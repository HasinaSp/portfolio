"use client";

import { useState } from "react";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Presse-papiers indisponible : le lien reste sélectionnable à côté.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-full bg-[#d00018] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#b60015]"
    >
      {copied ? "Copié ✓" : "Copier le lien"}
    </button>
  );
}
