import { getServices } from "@/data/services";
import { getBudgetOptions } from "@/lib/contact-options";
import { budgetLabel, serviceLabel } from "@/lib/contact-requests";
import type { Locale, Localized } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { sendMail } from "@/lib/mailer";
import { rateLimit } from "@/lib/rate-limit";
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

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");
}

export async function notifyNewContactRequest(id: string, data: ContactInput, lang: Locale) {
  await Promise.all([notifyAdmin(id, data), confirmToVisitor(data, lang)]);
}

async function notifyAdmin(id: string, data: ContactInput) {
  const to = process.env.CONTACT_NOTIFY_TO || process.env.ADMIN_EMAIL;
  if (!to) return;

  const rows: [string, string][] = [
    ["Nom", data.name],
    ["E-mail", data.email],
    ["Entreprise", data.company ?? "—"],
    ["Service", serviceLabel(data.service)],
    ["Budget", budgetLabel(data.budget ?? null)],
  ];
  const adminUrl = `${siteUrl()}/admin/demandes/${id}`;

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
  visit: string;
}> = {
  fr: {
    subject: "Votre demande de collaboration a bien été reçue",
    greeting: "Bonjour,",
    intro:
      "Merci pour votre message ! Votre demande de collaboration a bien été reçue. Je l'étudie et je reviens vers vous dans les plus brefs délais.",
    recap: "Récapitulatif",
    service: "Service",
    budget: "Budget",
    reply: "Pour toute précision, répondez simplement à cet email.",
    signature: "À très vite,",
    visit: "Voir le portfolio",
  },
  en: {
    subject: "Your collaboration request has been received",
    greeting: "Hello,",
    intro:
      "Thank you for your message! Your collaboration request has been received. I will review it and get back to you as soon as possible.",
    recap: "Summary",
    service: "Service",
    budget: "Budget",
    reply: "If you have anything to add, simply reply to this email.",
    signature: "Speak soon,",
    visit: "Visit the portfolio",
  },
};

async function confirmToVisitor(data: ContactInput, lang: Locale) {
  // L'adresse est saisie par le visiteur : au plus 2 accusés par jour et par
  // adresse, pour que le formulaire ne serve pas à bombarder une boîte mail.
  if (!(await rateLimit(`mail:confirm:${data.email}`, 2, DAY_MS))) return;

  const t = confirmation[lang];
  const service =
    getServices(lang).find((item) => item.slug === data.service)?.title ?? data.service;
  const budget = data.budget
    ? (getBudgetOptions(lang).find((option) => option.value === data.budget)?.label ?? null)
    : null;
  const url = `${siteUrl()}${localePath(lang, "/")}`;

  // Volontairement aucun texte libre du visiteur (nom, message) : l'email part
  // vers une adresse non vérifiée et ne doit pas pouvoir transporter du spam.
  const rows: [string, string][] = [[t.service, service]];
  if (budget) rows.push([t.budget, budget]);

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;color:#111;font-size:15px;line-height:1.6">
      <p style="margin:0 0 16px">${t.greeting}</p>
      <p style="margin:0 0 20px">${t.intro}</p>
      <p style="margin:0 0 8px;color:#666;font-size:13px;text-transform:uppercase;letter-spacing:.08em">${t.recap}</p>
      <table style="border-collapse:collapse;font-size:14px;margin:0 0 20px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666">${label}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:0 0 20px">${t.reply}</p>
      <p style="margin:0">${t.signature}<br><strong>Hasina</strong></p>
      <p style="margin:28px 0 0">
        <a href="${escapeHtml(url)}" style="background:${RED};color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-size:14px">${t.visit}</a>
      </p>
    </div>`;

  const text = [
    t.greeting,
    "",
    t.intro,
    "",
    `${t.recap} :`,
    ...rows.map(([label, value]) => `- ${label} : ${value}`),
    "",
    t.reply,
    "",
    t.signature,
    "Hasina",
    url,
  ].join("\n");

  await sendMail({
    to: data.email,
    // Les réponses du visiteur arrivent dans la boîte de l'admin.
    replyTo: process.env.CONTACT_NOTIFY_TO || process.env.ADMIN_EMAIL,
    subject: t.subject,
    html,
    text,
  });
}
