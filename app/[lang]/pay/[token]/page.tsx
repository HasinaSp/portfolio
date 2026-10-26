import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import PaymentStatusPoller from "@/components/payments/PaymentStatusPoller";
import Container from "@/components/ui/Container";
import { prisma } from "@/lib/db";
import { hasLocale, intlLocale, localePath, type Localized } from "@/lib/i18n";
import { formatMoney } from "@/lib/payments";

import { startCheckout } from "./actions";

// Jetons créés depuis l'admin : jamais connus au build (le layout [lang]
// limite ses propres paramètres aux langues).
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ lang: string; token: string }>;
  searchParams: Promise<{ retour?: string; erreur?: string }>;
};

const content: Localized<{
  metaTitle: string;
  eyebrow: string;
  requestTitle: string;
  requestText: string;
  billedTo: string;
  service: string;
  amount: string;
  pay: (amount: string) => string;
  secure: string;
  failed: string;
  launchError: string;
  confirming: string;
  slow: string;
  retry: string;
  paidTitle: string;
  paidText: string;
  paidOn: string;
  order: string;
  officialReceipt: string;
  testMode: string;
  refundedTitle: string;
  refundedText: string;
  partialTitle: string;
  partialText: string;
  questions: string;
  contactLink: string;
}> = {
  fr: {
    metaTitle: "Paiement",
    eyebrow: "Paiement",
    requestTitle: "Règlement de votre prestation.",
    requestText:
      "Vérifiez le détail ci-dessous, puis réglez en toute sécurité sur la page de paiement de Lemon Squeezy (carte bancaire et autres moyens selon votre pays).",
    billedTo: "Client",
    service: "Prestation",
    amount: "Montant",
    pay: (amount) => `Payer ${amount}`,
    secure:
      "Paiement sécurisé par Lemon Squeezy, qui gère les taxes de votre pays et vous envoie le reçu officiel par email.",
    failed: "Le dernier paiement n'a pas abouti. Vous pouvez réessayer.",
    launchError:
      "La page de paiement n'a pas pu être ouverte. Réessayez dans un instant, ou contactez-moi.",
    confirming: "Paiement en cours de confirmation…",
    slow:
      "La confirmation prend plus de temps que prévu. Si vous avez bien payé, vous recevrez le reçu par email : inutile de payer une seconde fois.",
    retry: "Le paiement n'a pas abouti ? Revenir au paiement",
    paidTitle: "Paiement confirmé.",
    paidText: "Merci ! Votre paiement a bien été reçu.",
    paidOn: "Payé le",
    order: "Commande",
    officialReceipt: "Voir le reçu officiel",
    testMode: "Mode test : aucun argent réel n'a été prélevé.",
    refundedTitle: "Paiement remboursé.",
    refundedText: "Ce paiement a été intégralement remboursé.",
    partialTitle: "Paiement remboursé en partie.",
    partialText: "Une partie de ce paiement a été remboursée.",
    questions: "Une question sur ce paiement ?",
    contactLink: "Me contacter",
  },
  en: {
    metaTitle: "Payment",
    eyebrow: "Payment",
    requestTitle: "Payment for your project.",
    requestText:
      "Check the details below, then pay securely on the Lemon Squeezy payment page (card and other methods depending on your country).",
    billedTo: "Client",
    service: "Service",
    amount: "Amount",
    pay: (amount) => `Pay ${amount}`,
    secure:
      "Secure payment by Lemon Squeezy, which handles your country's taxes and emails you the official receipt.",
    failed: "The last payment attempt did not go through. You can try again.",
    launchError:
      "The payment page could not be opened. Please try again in a moment, or contact me.",
    confirming: "Confirming your payment…",
    slow:
      "Confirmation is taking longer than expected. If you have paid, you will receive the receipt by email: there is no need to pay again.",
    retry: "Payment didn't go through? Back to payment",
    paidTitle: "Payment confirmed.",
    paidText: "Thank you! Your payment has been received.",
    paidOn: "Paid on",
    order: "Order",
    officialReceipt: "View the official receipt",
    testMode: "Test mode: no real money was charged.",
    refundedTitle: "Payment refunded.",
    refundedText: "This payment has been fully refunded.",
    partialTitle: "Payment partially refunded.",
    partialText: "Part of this payment has been refunded.",
    questions: "A question about this payment?",
    contactLink: "Contact me",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return {
    title: content[lang].metaTitle,
    // Page privée (lien envoyé au client) : jamais indexée.
    robots: { index: false, follow: false },
  };
}

export default async function PayPage({ params, searchParams }: PageProps) {
  // Statut lu à chaque visite (jamais mis en cache).
  await connection();

  const { lang, token } = await params;
  if (!hasLocale(lang)) notFound();

  const payment = await prisma.payment.findUnique({ where: { token } });
  if (!payment) notFound();

  const { retour, erreur } = await searchParams;
  const t = content[lang];
  const amount = formatMoney(payment.amount, payment.currency, lang);
  const pagePath = localePath(lang, `/pay/${payment.token}`);

  const rows: [string, string][] = [
    [t.billedTo, payment.clientName],
    [t.service, payment.description],
    [t.amount, amount],
  ];

  const isPaid = payment.status === "PAID";
  const isRefunded = payment.status === "REFUNDED" || payment.status === "PARTIAL_REFUND";
  const waiting = !isPaid && !isRefunded && retour === "1" && payment.status === "PENDING";

  return (
    <Container>
      <div className="mx-auto max-w-2xl py-20 sm:py-28">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-[#d00018]" />
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
            {t.eyebrow}
          </p>
        </div>

        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
          {isPaid
            ? t.paidTitle
            : payment.status === "REFUNDED"
              ? t.refundedTitle
              : payment.status === "PARTIAL_REFUND"
                ? t.partialTitle
                : t.requestTitle}
        </h1>

        <p className="mt-6 text-base leading-8 text-neutral-400">
          {isPaid
            ? t.paidText
            : payment.status === "REFUNDED"
              ? t.refundedText
              : payment.status === "PARTIAL_REFUND"
                ? t.partialText
                : t.requestText}
        </p>

        <div className="relative mt-12 border border-[#1f1f1f] bg-[#050505] p-6 sm:p-10">
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 h-px w-24 ${isPaid ? "bg-emerald-400" : "bg-[#d00018]"}`}
          />

          <dl className="divide-y divide-[#1f1f1f] text-sm">
            {rows.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-6 py-4">
                <dt className="text-neutral-500">{label}</dt>
                <dd className="break-words text-right text-neutral-100">{value}</dd>
              </div>
            ))}
            {isPaid && payment.paidAt && (
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-neutral-500">{t.paidOn}</dt>
                <dd className="text-right text-neutral-100">
                  {new Intl.DateTimeFormat(intlLocale[lang], { dateStyle: "long" }).format(
                    payment.paidAt,
                  )}
                </dd>
              </div>
            )}
            {(isPaid || isRefunded) && payment.orderNumber && (
              <div className="flex justify-between gap-6 py-4">
                <dt className="text-neutral-500">{t.order}</dt>
                <dd className="text-right text-neutral-100">n° {payment.orderNumber}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8">
            {isPaid || isRefunded ? (
              <>
                {payment.receiptUrl && (
                  <a
                    href={payment.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#d00018] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
                  >
                    {t.officialReceipt} <span aria-hidden="true">↗</span>
                  </a>
                )}
                {payment.testMode && <p className="mt-4 text-xs text-amber-300">{t.testMode}</p>}
              </>
            ) : waiting ? (
              <div className="space-y-4">
                <PaymentStatusPoller pendingText={t.confirming} slowText={t.slow} />
                <Link
                  href={pagePath}
                  className="inline-block text-xs text-neutral-500 underline-offset-4 hover:text-white hover:underline"
                >
                  {t.retry}
                </Link>
              </div>
            ) : (
              <>
                {(payment.status === "FAILED" || erreur) && (
                  <p
                    role="alert"
                    className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
                  >
                    {erreur ? t.launchError : t.failed}
                  </p>
                )}
                <form action={startCheckout}>
                  <input type="hidden" name="token" value={payment.token} />
                  <input type="hidden" name="lang" value={lang} />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-[#d00018] px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-[#b60015] sm:w-auto"
                  >
                    {t.pay(amount)}
                  </button>
                </form>
                <p className="mt-5 text-xs leading-5 text-neutral-500">{t.secure}</p>
              </>
            )}
          </div>
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          {t.questions}{" "}
          <Link
            href={localePath(lang, "/contact")}
            className="text-neutral-300 underline-offset-4 hover:text-white hover:underline"
          >
            {t.contactLink}
          </Link>
        </p>
      </div>
    </Container>
  );
}
