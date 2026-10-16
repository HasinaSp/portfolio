import type { ContactStatus } from "@prisma/client";

import { statusMeta } from "@/lib/contact-requests";

export default function StatusBadge({ status }: { status: ContactStatus }) {
  const meta = statusMeta[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${meta.className}`}
    >
      {status === "NEW" && (
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      )}
      {meta.label}
    </span>
  );
}
