import Link from "next/link";
import { notFound } from "next/navigation";

import CopyLinkButton from "@/components/admin/CopyLinkButton";
import DeletePaymentButton from "@/components/admin/DeletePaymentButton";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
import { requireAdmin } from "@/lib/admin";
import { formatRequestDate } from "@/lib/contact-requests";
import { prisma } from "@/lib/db";
import { hasLocale } from "@/lib/i18n";
import { formatMoney, paymentUrl } from "@/lib/payments";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ cree?: string }>;
};

export default async function PaymentPage({ params, searchParams }: PageProps) {
  await requireAdmin();

  const { id } = await params;
  const { cree } = await searchParams;
  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { contactRequest: { select: { id: true, name: true } } },
  });

  if (!payment) notFound();

  const url = paymentUrl(payment.token, hasLocale(payment.lang) ? payment.lang : "fr");
  const canDelete = (payment.status === "PENDING" || payment.status === "FAILED") && !payment.orderId;

  const details: [string, string][] = [
    ["Montant", formatMoney(payment.amount, payment.currency)],
    ["Email", payment.clientEmail],
    ["Langue", payment.lang === "en" ? "English" : "Français"],
    ["Créé le", formatRequestDate(payment.createdAt)],
    ["Payé le", payment.paidAt ? formatRequestDate(payment.paidAt) : "—"],
    ["Commande Lemon Squeezy", payment.orderNumber ? `n° ${payment.orderNumber}` : "—"],
  ];
  if (payment.testMode) details.push(["Mode", "Test (aucun argent réel)"]);

  return (
    <div>
      <Link
        href="/admin/paiements"
        className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
      >
        <span aria-hidden="true">←</span> Tous les paiements
      </Link>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="break-words text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
            {payment.clientName}
            <span className="text-[#d00018]">.</span>
          </h1>
          <p className="mt-3 text-sm text-neutral-400">{payment.description}</p>
        </div>
        <PaymentStatusBadge status={payment.status} />
      </div>

      {cree && (
        <p
          role="status"
          className="mt-6 border border-emerald-900/60 bg-emerald-950/20 p-3 text-sm text-emerald-400"
        >
          Paiement créé. Copiez le lien ci-dessous et envoyez-le à {payment.clientName}.
        </p>
      )}

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section
          aria-labelledby="lien"
          className="rounded-2xl border border-[#1f1f1f] bg-[#050505] p-6 sm:p-8"
        >
          <h2 id="lien" className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Lien de paiement
          </h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <code className="min-w-0 flex-1 select-all break-all rounded-xl border border-white/10 bg-black px-4 py-3 text-xs text-neutral-200">
              {url}
            </code>
            <CopyLinkButton url={url} />
          </div>
          <p className="mt-4 text-sm leading-6 text-neutral-500">
            Le client voit le montant et la prestation, puis paie sur la page sécurisée de Lemon
            Squeezy. Le statut passe à « Payé » dès que Lemon Squeezy confirme le paiement, et
            vous recevez un email.
          </p>
          {payment.receiptUrl && (
            <a
              href={payment.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2a2a2a] px-5 py-2.5 text-sm text-neutral-200 transition-colors hover:border-neutral-500"
            >
              Reçu Lemon Squeezy <span aria-hidden="true">↗</span>
            </a>
          )}
        </section>

        <div className="grid gap-6">
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
                  <dd className="break-all text-right text-neutral-200">{value}</dd>
                </div>
              ))}
              {payment.contactRequest && (
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-neutral-500">Demande</dt>
                  <dd className="text-right">
                    <Link
                      href={`/admin/demandes/${payment.contactRequest.id}`}
                      className="text-neutral-200 underline-offset-4 hover:underline"
                    >
                      {payment.contactRequest.name}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </section>

          {canDelete && (
            <div className="flex justify-end">
              <DeletePaymentButton id={payment.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
