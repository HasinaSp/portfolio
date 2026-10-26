import type { PaymentStatus } from "@prisma/client";

import { paymentStatusMeta } from "@/lib/payments";

export default function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const meta = paymentStatusMeta[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] ${meta.className}`}
    >
      {meta.label}
    </span>
  );
}
