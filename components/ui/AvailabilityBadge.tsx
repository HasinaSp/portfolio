import { availability } from "@/data/availability";
import type { Locale } from "@/lib/i18n";

// Pastille de disponibilité (le point vert pulse ; arrêté si moins d'animations).
export default function AvailabilityBadge({
  lang,
  className = "",
}: {
  lang: Locale;
  className?: string;
}) {
  const { available, label, detail, unavailableLabel } = availability;

  return (
    <p
      className={`inline-flex items-center gap-3 rounded-full border border-[#242424] bg-white/[0.03] px-4 py-2 text-xs text-neutral-300 backdrop-blur ${className}`}
    >
      <span aria-hidden="true" className="relative flex h-2 w-2">
        {available && (
          <span className="availability-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${available ? "bg-emerald-400" : "bg-neutral-500"}`}
        />
      </span>
      <span>
        {available ? label[lang] : unavailableLabel[lang]}
        {available && detail && <span className="text-neutral-500"> · {detail[lang]}</span>}
      </span>
    </p>
  );
}
