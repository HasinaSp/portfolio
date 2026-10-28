import type { Payment } from "@prisma/client";

import { hasLocale, type Localized } from "@/lib/i18n";
import { sendMail } from "@/lib/mailer";
import { formatMoney, paymentUrl } from "@/lib/payments";
import { getSiteUrl } from "@/lib/site-url";

/*
 * Emails liés aux paiements :
 *  - au client, le lien de paiement (à la création, ou renvoyé depuis l'admin) ;
 *  - à l'admin, quand un paiement est confirmé par Lemon Squeezy. Le client,
 *    lui, reçoit alors le reçu officiel envoyé par Lemon Squeezy.
 */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const linkEmail: Localized<{
  subject: string;
  greeting: string;
  intro: string;
  service: string;
  amount: string;
  cta: string;
  secure: string;
  signature: string;
}> = {
  fr: {
    subject: "Votre lien de paiement",
    greeting: "Bonjour",
    intro: "Comme convenu, voici le lien pour régler la prestation suivante :",
    service: "Prestation",
    amount: "Montant",
    cta: "Payer en ligne",
    secure:
      "Le paiement se fait sur la page sécurisée de Lemon Squeezy, qui vous enverra le reçu. Pour toute question, répondez simplement à cet email.",
    signature: "Merci et à très vite,",
  },
  en: {
    subject: "Your payment link",
    greeting: "Hello",
    intro: "As agreed, here is the link to pay for the following service:",
    service: "Service",
    amount: "Amount",
    cta: "Pay online",
    secure:
      "Payment is made on Lemon Squeezy's secure page, which will email you the receipt. If you have any question, simply reply to this email.",
    signature: "Thank you, speak soon,",
  },
};

// Lien de paiement envoyé au client, dans la langue du paiement.
export async function sendPaymentLink(payment: Payment): Promise<boolean> {
  const lang = hasLocale(payment.lang) ? payment.lang : "fr";
  const t = linkEmail[lang];
  const url = paymentUrl(payment.token, lang);
  const amount = formatMoney(payment.amount, payment.currency, lang);
  const rows: [string, string][] = [
    [t.service, payment.description],
    [t.amount, amount],
  ];

  // Sobre, comme écrit à la main (anti-spam) : un seul lien, celui du paiement.
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <p>${t.greeting} ${escapeHtml(payment.clientName)},</p>
      <p>${t.intro}</p>
      <p>${rows.map(([label, value]) => `${label} : <strong>${escapeHtml(value)}</strong>`).join("<br>")}</p>
      <p><a href="${escapeHtml(url)}">${t.cta}</a><br><span style="color:#666;font-size:13px">${escapeHtml(url)}</span></p>
      <p>${t.secure}</p>
      <p>${t.signature}<br>Hasina Andriamahandry</p>
    </div>`;

  const text = [
    `${t.greeting} ${payment.clientName},`,
    "",
    t.intro,
    "",
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    `${t.cta} : ${url}`,
    "",
    t.secure,
    "",
    t.signature,
    "Hasina Andriamahandry",
  ].join("\n");

  // Pas de replyTo : les réponses arrivent sur l'adresse d'envoi (SMTP_USER).
  return sendMail({
    kind: "lien de paiement",
    to: payment.clientEmail,
    subject: `${t.subject} — ${amount}`,
    html,
    text,
  });
}

export async function notifyPaymentReceived(payment: Payment) {
  const to = process.env.CONTACT_NOTIFY_TO || process.env.ADMIN_EMAIL;
  if (!to) {
    console.warn("Email « paiement reçu » non envoyé : CONTACT_NOTIFY_TO / ADMIN_EMAIL non définis.");
    return;
  }

  const amount = formatMoney(payment.amount, payment.currency);
  const adminUrl = `${getSiteUrl()}/admin/paiements/${payment.id}`;
  const rows: [string, string][] = [
    ["Client", payment.clientName],
    ["E-mail", payment.clientEmail],
    ["Objet", payment.description],
    ["Montant", amount],
    ["Commande", payment.orderNumber ? `n° ${payment.orderNumber}` : "—"],
  ];
  if (payment.testMode) rows.push(["Mode", "TEST (aucun argent réel)"]);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#111">
      <h2 style="margin:0 0 16px">Paiement reçu : ${escapeHtml(amount)}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:28px 0 0">
        <a href="${escapeHtml(adminUrl)}" style="background:#d00018;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-size:14px">Voir dans l'admin</a>
      </p>
    </div>`;

  const text = [
    `Paiement reçu : ${amount}`,
    "",
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    `Admin : ${adminUrl}`,
  ].join("\n");

  await sendMail({
    kind: "paiement reçu",
    to,
    replyTo: payment.clientEmail,
    subject: `${payment.testMode ? "[TEST] " : ""}Paiement reçu — ${payment.clientName} (${amount})`,
    html,
    text,
  });
}
