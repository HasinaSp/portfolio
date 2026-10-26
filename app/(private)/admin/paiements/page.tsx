import Link from "next/link";

import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
import { requireAdmin } from "@/lib/admin";
import { formatRequestDate } from "@/lib/contact-requests";
import { prisma } from "@/lib/db";
import { lemonSqueezyConfigured } from "@/lib/lemonsqueezy";
import { formatMoney } from "@/lib/payments";

type PageProps = {
  searchParams: Promise<{ supprime?: string }>;
};

export default async function PaymentsPage({ searchParams }: PageProps) {
  await requireAdmin();

  const { supprime } = await searchParams;
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            Paiements<span className="text-[#d00018]">.</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-500">
            Liens de paiement envoyés aux clients, réglés via Lemon Squeezy.
          </p>
        </div>
        <Link
          href="/admin/paiements/nouveau"
          className="inline-flex items-center justify-center rounded-full bg-[#d00018] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
        >
          Nouveau paiement
        </Link>
      </div>

      {!lemonSqueezyConfigured() && (
        <p
          role="alert"
          className="mt-6 border border-amber-900/60 bg-amber-950/20 p-3 text-sm text-amber-300"
        >
          Lemon Squeezy n&apos;est pas configuré : ajoutez les variables LEMONSQUEEZY_* (voir le README).
        </p>
      )}

      {supprime && (
        <p
          role="status"
          className="mt-6 border border-emerald-900/60 bg-emerald-950/20 p-3 text-sm text-emerald-400"
        >
          Paiement supprimé.
        </p>
      )}

      {payments.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-[#2a2a2a] p-12 text-center text-sm text-neutral-500">
          Aucun paiement pour le moment.
        </p>
      ) : (
        <ul className="mt-8 grid gap-3">
          {payments.map((payment) => (
            <li key={payment.id}>
              <Link
                href={`/admin/paiements/${payment.id}`}
                className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1f1f1f] bg-[#050505] p-5 transition-colors hover:border-[#333] sm:p-6"
              >
                <div className="min-w-0">
                  <p className="truncate text-lg font-medium text-white transition-colors group-hover:text-[#ff4d5e]">
                    {payment.clientName}
                  </p>
                  <p className="mt-1 truncate text-sm text-neutral-500">{payment.description}</p>
                  <time
                    dateTime={payment.createdAt.toISOString()}
                    className="mt-2 block text-xs text-neutral-600"
                  >
                    {formatRequestDate(payment.createdAt)}
                    {payment.testMode && " · test"}
                  </time>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg tabular-nums text-white">
                    {formatMoney(payment.amount, payment.currency)}
                  </span>
                  <PaymentStatusBadge status={payment.status} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
