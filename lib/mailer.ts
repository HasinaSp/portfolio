import nodemailer, { type Transporter } from "nodemailer";

import { rateLimit } from "@/lib/rate-limit";

/*
 * Envoi d'emails par SMTP (Gmail gratuit : smtp.gmail.com, port 465, avec un
 * mot de passe d'application Google). Inactif tant que SMTP_USER et
 * SMTP_PASSWORD ne sont pas définis.
 * Ne lève jamais d'erreur : renvoie false si l'email n'est pas parti.
 */

// Gmail gratuit plafonne à ~500 destinataires par jour : on garde une marge
// pour que le formulaire ne puisse pas épuiser (ou faire suspendre) le compte.
const DAILY_LIMIT = 400;
const DAY_MS = 24 * 60 * 60 * 1000;

let transporter: Transporter | undefined;

export type Mail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendMail(mail: Mail): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!user || !pass) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[email non envoyé, SMTP non configuré] ${mail.subject} → ${mail.to}`);
    }
    return false;
  }

  if (!(await rateLimit("mail:daily", DAILY_LIMIT, DAY_MS))) {
    console.error("Email non envoyé : quota journalier atteint.");
    return false;
  }

  const port = Number(process.env.SMTP_PORT || 465);
  transporter ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  try {
    await transporter.sendMail({
      // Gmail impose l'adresse du compte comme expéditeur.
      from: process.env.MAIL_FROM || `Hasina Andriamahandry <${user}>`,
      to: mail.to,
      replyTo: mail.replyTo,
      // Pas de retour à la ligne dans un en-tête (injection d'en-têtes).
      subject: mail.subject.replace(/[\r\n]+/g, " "),
      html: mail.html,
      text: mail.text,
    });
    return true;
  } catch (error) {
    // Pas de données personnelles dans les logs.
    console.error("Email non envoyé :", error instanceof Error ? error.message : error);
    return false;
  }
}
