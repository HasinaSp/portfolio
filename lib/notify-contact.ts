import { budgetLabel, serviceLabel } from "@/lib/contact-requests";
import type { ContactInput } from "@/lib/validations";

/*
 * Email envoyé à l'admin à chaque nouvelle demande de contact, via l'API
 * Resend (plan gratuit). Inactif tant que RESEND_API_KEY n'est pas définie.
 * Ne lève jamais d'erreur : un problème d'email ne doit pas faire échouer
 * l'enregistrement de la demande.
 */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function notifyNewContactRequest(id: string, data: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_TO || process.env.ADMIN_EMAIL;
  // Sans domaine vérifié chez Resend, seule l'adresse de test fonctionne
  // (elle n'envoie qu'à l'adresse du compte Resend).
  const from = process.env.CONTACT_NOTIFY_FROM || "Portfolio <onboarding@resend.dev>";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!apiKey || !to) return;

  const rows: [string, string][] = [
    ["Nom", data.name],
    ["E-mail", data.email],
    ["Entreprise", data.company ?? "—"],
    ["Service", serviceLabel(data.service)],
    ["Budget", budgetLabel(data.budget ?? null)],
  ];
  const adminUrl = `${siteUrl}/admin/demandes/${id}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#111">
      <h2 style="margin:0 0 16px">Nouvelle demande de contact</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 8px;color:#666;font-size:13px">Message</p>
      <p style="white-space:pre-line;font-size:15px;line-height:1.6;margin:0">${escapeHtml(data.message)}</p>
      <p style="margin:28px 0 0">
        <a href="${escapeHtml(adminUrl)}" style="background:#d00018;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-size:14px">Ouvrir dans l'admin</a>
      </p>
    </div>`;

  const text = [
    "Nouvelle demande de contact",
    "",
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    data.message,
    "",
    `Admin : ${adminUrl}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // « Répondre » dans la messagerie écrit directement au visiteur.
        reply_to: data.email,
        subject: `Nouvelle demande — ${data.name} (${serviceLabel(data.service)})`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error("Email de notification non envoyé : HTTP", response.status);
    }
  } catch (error) {
    console.error(
      "Email de notification non envoyé :",
      error instanceof Error ? error.message : error,
    );
  }
}
