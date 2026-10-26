import { getServices } from "@/data/services";
import { getBudgetOptions } from "@/lib/contact-options";
import { budgetLabel, serviceLabel } from "@/lib/contact-requests";
import type { Locale, Localized } from "@/lib/i18n";
import { sendMail } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";
import { getSiteUrl } from "@/lib/site-url";
import type { ContactInput } from "@/lib/validations";

/*
 * Emails envoyés à chaque nouvelle demande de collaboration :
 *  1. à l'admin, avec le détail de la demande ;
 *  2. au visiteur, un accusé de réception dans sa langue.
 * Ne lève jamais d'erreur : un problème d'email ne doit pas faire échouer
 * l'enregistrement de la demande.
 */

const RED = "#d00018";
const DAY_MS = 24 * 60 * 60 * 1000;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function notifyNewContactRequest(id: string, data: ContactInput, lang: Locale) {
  await Promise.all([notifyAdmin(id, data), confirmToVisitor(data, lang)]);
}

async function notifyAdmin(id: string, data: ContactInput) {
  const to = process.env.CONTACT_NOTIFY_TO || process.env.ADMIN_EMAIL;
  if (!to) {
    console.warn("Email « nouvelle demande » non envoyé : CONTACT_NOTIFY_TO / ADMIN_EMAIL non définis.");
    return;
  }

  const rows: [string, string][] = [
    ["Nom", data.name],
    ["E-mail", data.email],
    ["Entreprise", data.company ?? "—"],
    ["Service", serviceLabel(data.service)],
    ["Budget", budgetLabel(data.budget ?? null)],
  ];
  const adminUrl = `${getSiteUrl()}/admin/demandes/${id}`;

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
        <a href="${escapeHtml(adminUrl)}" style="background:${RED};color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-size:14px">Ouvrir dans l'admin</a>
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

  await sendMail({
    kind: "nouvelle demande",
    to,
    // « Répondre » dans la messagerie écrit directement au visiteur.
    replyTo: data.email,
    subject: `Nouvelle demande — ${data.name} (${serviceLabel(data.service)})`,
    html,
    text,
  });
}

const confirmation: Localized<{
  subject: string;
  greeting: string;
  intro: string;
  recap: string;
  service: string;
  budget: string;
  reply: string;
  signature: string;
}> = {
  fr: {
    subject: "Votre demande de collaboration a bien été reçue",
    greeting: "Bonjour,",
    intro:
      "Merci pour votre message ! Votre demande de collaboration a bien été reçue. Je l'étudie et je reviens vers vous dans les plus brefs délais.",
    recap: "Votre demande",
    service: "Service",
    budget: "Budget",
    reply: "Pour toute précision, répondez simplement à cet email.",
    signature: "À très vite,",
  },
  en: {
    subject: "Your collaboration request has been received",
    greeting: "Hello,",
    intro:
      "Thank you for your message! Your collaboration request has been received. I will review it and get back to you as soon as possible.",
    recap: "Your request",
    service: "Service",
    budget: "Budget",
    reply: "If you have anything to add, simply reply to this email.",
    signature: "Speak soon,",
  },
};

async function confirmToVisitor(data: ContactInput, lang: Locale) {
  // L'adresse est saisie par le visiteur : au plus 2 accusés par jour et par
  // adresse, pour que le formulaire ne serve pas à bombarder une boîte mail.
  if (!(await rateLimit(`mail:confirm:${data.email}`, 2, DAY_MS))) {
    console.warn("Email « accusé de réception » non envoyé : déjà 2 envoyés à cette adresse aujourd'hui.");
    return;
  }

  const t = confirmation[lang];
  const service =
    getServices(lang).find((item) => item.slug === data.service)?.title ?? data.service;
  const budget = data.budget
    ? (getBudgetOptions(lang).find((option) => option.value === data.budget)?.label ?? null)
    : null;
  // Volontairement aucun texte libre du visiteur (nom, message) : l'email part
  // vers une adresse non vérifiée et ne doit pas pouvoir transporter du spam.
  const rows: [string, string][] = [[t.service, service]];
  if (budget) rows.push([t.budget, budget]);

  // Anti-spam : un email sobre, comme écrit à la main. Pas de bouton ni de
  // lien (les liens vers *.vercel.app sont souvent pénalisés), pas de mise en
  // page « newsletter », et pas de Reply-To différent de l'expéditeur.
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <p>${t.greeting}</p>
      <p>${t.intro}</p>
      <p>${t.recap} :<br>${rows.map(([label, value]) => `${label} : ${escapeHtml(value)}`).join("<br>")}</p>
      <p>${t.reply}</p>
      <p>${t.signature}<br>Hasina Andriamahandry</p>
    </div>`;

  const text = [
    t.greeting,
    "",
    t.intro,
    "",
    `${t.recap} :`,
    ...rows.map(([label, value]) => `${label} : ${value}`),
    "",
    t.reply,
    "",
    t.signature,
    "Hasina Andriamahandry",
  ].join("\n");

  // Pas de replyTo : les réponses arrivent sur l'adresse d'envoi (SMTP_USER).
  await sendMail({
    kind: "accusé de réception",
    to: data.email,
    subject: t.subject,
    html,
    text,
  });
}
