"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { getServices } from "@/data/services";
import { HONEYPOT_FIELD, getBudgetOptions } from "@/lib/contact-options";
import type { Locale, Localized } from "@/lib/i18n";

const content: Localized<{
  honeypotLabel: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  optional: string;
  serviceLabel: string;
  servicePlaceholder: string;
  budgetLabel: string;
  budgetPlaceholder: string;
  messageLabel: string;
  messageHint: string;
  messagePlaceholder: string;
  submitting: string;
  submit: string;
  privacy: string;
  fallbackError: string;
  fallbackSuccess: string;
  networkError: string;
}> = {
  fr: {
    honeypotLabel: "Ne pas remplir ce champ",
    nameLabel: "Nom",
    namePlaceholder: "Votre nom",
    emailLabel: "E-mail",
    emailPlaceholder: "vous@exemple.com",
    companyLabel: "Entreprise / activité",
    companyPlaceholder: "Nom de votre entreprise",
    optional: "(facultatif)",
    serviceLabel: "Service souhaité",
    servicePlaceholder: "Sélectionner un service",
    budgetLabel: "Budget estimé",
    budgetPlaceholder: "Sélectionner une fourchette",
    messageLabel: "Votre projet",
    messageHint: "Soyez aussi précis que possible",
    messagePlaceholder: "Décrivez votre projet, vos objectifs et vos besoins...",
    submitting: "Envoi en cours...",
    submit: "Envoyer ma demande",
    privacy:
      "Les informations transmises seront utilisées pour traiter votre demande et vous recontacter au sujet de votre projet.",
    fallbackError: "Veuillez vérifier les informations saisies.",
    fallbackSuccess: "Votre demande a bien été envoyée.",
    networkError:
      "Impossible d'envoyer votre demande. Réessayez dans quelques instants.",
  },
  en: {
    honeypotLabel: "Do not fill in this field",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    companyLabel: "Company / business",
    companyPlaceholder: "Your company name",
    optional: "(optional)",
    serviceLabel: "Service needed",
    servicePlaceholder: "Select a service",
    budgetLabel: "Estimated budget",
    budgetPlaceholder: "Select a range",
    messageLabel: "Your project",
    messageHint: "Be as specific as possible",
    messagePlaceholder: "Describe your project, your goals and your needs...",
    submitting: "Sending...",
    submit: "Send my request",
    privacy:
      "The information you provide will be used to handle your request and to get back to you about your project.",
    fallbackError: "Please check the information you entered.",
    fallbackSuccess: "Your request has been sent.",
    networkError:
      "Your request could not be sent. Please try again in a moment.",
  },
};

export default function ContactForm({ lang }: { lang: Locale }) {
  const t = content[lang];
  const services = getServices(lang);
  const budgetOptions = getBudgetOptions(lang);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: formData.get("service"),
      budget: formData.get("budget"),
      message: formData.get("message"),
      [HONEYPOT_FIELD]: formData.get(HONEYPOT_FIELD),
      lang,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        const errors = result.errors as
          | Record<string, string[]>
          | undefined;

        const firstError = errors
          ? Object.values(errors).flat()[0]
          : null;

        setStatus({
          type: "error",
          message:
            firstError ||
            result.message ||
            t.fallbackError,
        });

        return;
      }

      setStatus({
        type: "success",
        message: result.message || t.fallbackSuccess,
      });

      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: t.networkError,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "mt-3 w-full rounded-none border-b border-[#292929] bg-transparent px-0 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-700 focus:border-[#d00018] focus-visible:border-[#d00018]";

  const labelClass =
    "text-xs font-medium uppercase tracking-[0.15em] text-neutral-500";

  const selectClass =
    "mt-3 w-full appearance-none rounded-none border-b border-[#292929] bg-[#050505] px-0 py-3.5 text-sm text-neutral-300 outline-none transition-colors focus:border-[#d00018]";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Piège à robots : invisible et hors de la navigation clavier. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>{t.honeypotLabel}</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {/* Nom et e-mail */}
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t.nameLabel} <span className="text-[#d00018]">*</span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            placeholder={t.namePlaceholder}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            {t.emailLabel} <span className="text-[#d00018]">*</span>
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder={t.emailPlaceholder}
            className={fieldClass}
          />
        </div>
      </div>

      {/* Entreprise */}
      <div>
        <label htmlFor="company" className={labelClass}>
          {t.companyLabel}
          <span className="ml-2 normal-case tracking-normal text-neutral-700">
            {t.optional}
          </span>
        </label>

        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={150}
          placeholder={t.companyPlaceholder}
          className={fieldClass}
        />
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className={labelClass}>
          {t.serviceLabel} <span className="text-[#d00018]">*</span>
        </label>

        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            {t.servicePlaceholder}
          </option>

          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      {/* Budget */}
      <div>
        <label htmlFor="budget" className={labelClass}>
          {t.budgetLabel}
          <span className="ml-2 normal-case tracking-normal text-neutral-700">
            {t.optional}
          </span>
        </label>

        <select
          id="budget"
          name="budget"
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            {t.budgetPlaceholder}
          </option>

          {budgetOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="message" className={labelClass}>
            {t.messageLabel} <span className="text-[#d00018]">*</span>
          </label>

          <span className="text-[11px] text-neutral-700">
            {t.messageHint}
          </span>
        </div>

        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          placeholder={t.messagePlaceholder}
          className="mt-4 w-full resize-y rounded-none border border-[#292929] bg-transparent p-4 text-sm leading-7 text-white outline-none transition-colors placeholder:text-neutral-700 focus:border-[#d00018] sm:p-5"
        />
      </div>

      {/* Bouton d'envoi */}
      <div className="space-y-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d00018] px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_30px_rgba(208,0,24,0.15)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4Z"
                />
              </svg>
              {t.submitting}
            </>
          ) : (
            <>
              {t.submit}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </>
          )}
        </button>

        {/* Retour API */}
        {status && (
          <div
            role={status.type === "error" ? "alert" : "status"}
            aria-live={status.type === "error" ? "assertive" : "polite"}
            className={`flex gap-3 border p-4 text-sm leading-6 ${
              status.type === "success"
                ? "border-emerald-900/60 bg-emerald-950/20 text-emerald-400"
                : "border-red-900/60 bg-red-950/20 text-red-300"
            }`}
          >
            <span aria-hidden="true" className="font-semibold">
              {status.type === "success" ? "✓" : "!"}
            </span>
            <p>{status.message}</p>
          </div>
        )}

        <p className="max-w-lg text-xs leading-6 text-neutral-600">
          {t.privacy}
        </p>
      </div>
    </form>
  );
}
