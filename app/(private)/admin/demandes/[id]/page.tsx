import Link from "next/link";
import { notFound } from "next/navigation";

import { updateRequestStatus } from "@/app/(private)/admin/actions";
import DeleteRequestButton from "@/components/admin/DeleteRequestButton";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
import StatusBadge from "@/components/admin/StatusBadge";
import { requireAdmin } from "@/lib/admin";
import {
  CONTACT_STATUSES,
  budgetLabel,
  formatRequestDate,
  serviceLabel,
  statusMeta,
} from "@/lib/contact-requests";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/payments";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ContactRequestPage({ params }: PageProps) {
  await requireAdmin();

  const { id } = await params;
  const request = await prisma.contactRequest.findUnique({
    where: { id },
    include: { payments: { orderBy: { createdAt: "desc" } } },
  });

  if (!request) notFound();

  const replySubject = `Re : votre demande — ${serviceLabel(request.service)}`;
  const replyHref = `mailto:${request.email}?subject=${encodeURIComponent(replySubject)}`;

  const details: [string, string][] = [
    ["Service", serviceLabel(request.service)],
    ["Budget", budgetLabel(request.budget)],
    ["Entreprise", request.company ?? "—"],
    ["Reçue le", formatRequestDate(request.createdAt)],
    ["Mise à jour", formatRequestDate(request.updatedAt)],
  ];

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
      >
        <span aria-hidden="true">←</span> Toutes les demandes
      </Link>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="break-words text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            {request.name}
            <span className="text-[#d00018]">.</span>
          </h1>
          <a
            href={replyHref}
            className="mt-3 inline-block break-all text-sm text-neutral-400 underline-offset-4 hover:text-white hover:underline"
          >
            {request.email}
          </a>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section
          aria-labelledby="message"
          className="rounded-2xl border border-[#1f1f1f] bg-[#050505] p-6 sm:p-8"
        >
          <h2
            id="message"
            className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500"
          >
            Message
          </h2>
          <p className="mt-5 whitespace-pre-line break-words text-base leading-8 text-neutral-200">
            {request.message}
          </p>
          <a
            href={replyHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d00018] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
          >
            Répondre par e-mail <span aria-hidden="true">↗</span>
          </a>
        </section>

        <div className="grid gap-6">
          <section
            aria-labelledby="statut"
            className="rounded-2xl border border-[#1f1f1f] bg-[#050505] p-6"
          >
            <h2
              id="statut"
              className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500"
            >
              Suivi
            </h2>
            <form action={updateRequestStatus} className="mt-4 flex flex-wrap gap-2">
              <input type="hidden" name="id" value={request.id} />
              {CONTACT_STATUSES.map((value) => {
                const current = value === request.status;
                return (
                  <button
                    key={value}
                    type="submit"
                    name="status"
                    value={value}
                    disabled={current}
                    aria-pressed={current}
                    className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
                      current
                        ? statusMeta[value].className
                        : "border-[#2a2a2a] text-neutral-400 hover:border-neutral-500 hover:text-white"
                    }`}
                  >
                    {statusMeta[value].label}
                  </button>
                );
              })}
            </form>
          </section>

          <section
            aria-labelledby="details"
            className="rounded-2xl border border-[#1f1f1f] bg-[#050505] p-6"
          >
            <h2
              id="details"
              className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500"
            >
              Détails
            </h2>
            <dl className="mt-4 divide-y divide-[#1f1f1f] text-sm">
              {details.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-3">
                  <dt className="text-neutral-500">{label}</dt>
                  <dd className="text-right text-neutral-200">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            aria-labelledby="paiements"
            className="rounded-2xl border border-[#1f1f1f] bg-[#050505] p-6"
          >
            <h2
              id="paiements"
              className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500"
            >
              Paiements
            </h2>
            {request.payments.length > 0 && (
              <ul className="mt-4 divide-y divide-[#1f1f1f] text-sm">
                {request.payments.map((payment) => (
                  <li key={payment.id}>
                    <Link
                      href={`/admin/paiements/${payment.id}`}
                      className="flex items-center justify-between gap-4 py-3 text-neutral-200 hover:text-white"
                    >
                      <span className="tabular-nums">
                        {formatMoney(payment.amount, payment.currency)}
                      </span>
                      <PaymentStatusBadge status={payment.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              href={`/admin/paiements/nouveau?demande=${request.id}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-4 py-2 text-xs font-medium text-neutral-300 transition-colors hover:border-[#d00018] hover:text-white"
            >
              Créer un paiement <span aria-hidden="true">→</span>
            </Link>
          </section>

          <div className="flex justify-end">
            <DeleteRequestButton id={request.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
