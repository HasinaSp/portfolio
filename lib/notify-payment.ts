import type { Payment } from "@prisma/client";

import { sendMail } from "@/lib/mailer";
import { formatMoney, siteUrl } from "@/lib/payments";

/*
 * Email à l'admin quand un paiement est confirmé par Lemon Squeezy. Le client,
 * lui, reçoit le reçu officiel envoyé par Lemon Squeezy.
 */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function notifyPaymentReceived(payment: Payment) {
  const to = process.env.CONTACT_NOTIFY_TO || process.env.ADMIN_EMAIL;
  if (!to) {
    console.warn("Email « paiement reçu » non envoyé : CONTACT_NOTIFY_TO / ADMIN_EMAIL non définis.");
    return;
  }

  const amount = formatMoney(payment.amount, payment.currency);
  const adminUrl = `${siteUrl()}/admin/paiements/${payment.id}`;
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
