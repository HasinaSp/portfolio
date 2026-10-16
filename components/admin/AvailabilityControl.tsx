import { updateAvailability } from "@/app/(private)/admin/actions";
import { availability } from "@/data/availability";

// Interrupteur du badge de disponibilité affiché sur le site public.
export default function AvailabilityControl({
  available,
  acceptedCount,
}: {
  available: boolean;
  acceptedCount: number;
}) {
  return (
    <section
      aria-labelledby="availability-title"
      className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#1f1f1f] bg-[#050505] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
    >
      <div className="min-w-0">
        <h2 id="availability-title" className="text-xs uppercase tracking-[0.18em] text-neutral-500">
          Disponibilité affichée sur le site
        </h2>
        <p className="mt-2 flex items-center gap-3 text-white">
          <span
            aria-hidden="true"
            className={`inline-flex h-2 w-2 shrink-0 rounded-full ${available ? "bg-emerald-400" : "bg-neutral-500"}`}
          />
          {available ? availability.label.fr : availability.unavailableLabel.fr}
        </p>
        <p className="mt-1 text-sm text-neutral-500">
          {acceptedCount} demande(s) acceptée(s) en ce moment.
        </p>
      </div>

      <form action={updateAvailability}>
        <input type="hidden" name="available" value={available ? "false" : "true"} />
        <button
          type="submit"
          className={`w-full rounded-full border px-5 py-2.5 text-sm transition-colors sm:w-auto ${
            available
              ? "border-[#2a2a2a] text-neutral-300 hover:border-neutral-500 hover:text-white"
              : "border-emerald-500/50 text-emerald-300 hover:border-emerald-400 hover:text-emerald-200"
          }`}
        >
          {available ? "Passer en « planning complet »" : "Redevenir disponible"}
        </button>
      </form>
    </section>
  );
}
