"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { services } from "@/data/services";

export default function ContactForm() {
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
            "Veuillez vérifier les informations saisies.",
        });

        return;
      }

      setStatus({
        type: "success",
        message: result.message || "Votre demande a bien été envoyée.",
      });

      form.reset();
    } catch {
      setStatus({
        type: "error",
        message:
          "Impossible d'envoyer votre demande. Réessayez dans quelques instants.",
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
      {/* Nom et e-mail */}
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nom <span className="text-[#d00018]">*</span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Votre nom"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail <span className="text-[#d00018]">*</span>
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="vous@exemple.com"
            className={fieldClass}
          />
        </div>
      </div>

      {/* Entreprise */}
      <div>
        <label htmlFor="company" className={labelClass}>
          Entreprise / activité
          <span className="ml-2 normal-case tracking-normal text-neutral-700">
            (facultatif)
          </span>
        </label>

        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={150}
          placeholder="Nom de votre entreprise"
          className={fieldClass}
        />
      </div>

      {/* Service */}
      <div>
        <label htmlFor="service" className={labelClass}>
          Service souhaité <span className="text-[#d00018]">*</span>
        </label>

        <select
          id="service"
          name="service"
          required
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Sélectionner un service
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
          Budget estimé
          <span className="ml-2 normal-case tracking-normal text-neutral-700">
            (facultatif)
          </span>
        </label>

        <select
          id="budget"
          name="budget"
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Sélectionner une fourchette
          </option>

          <option value="under-500">Moins de 500 €</option>
          <option value="500-1000">500 € – 1 000 €</option>
          <option value="1000-2500">1 000 € – 2 500 €</option>
          <option value="2500-5000">2 500 € – 5 000 €</option>
          <option value="5000-plus">Plus de 5 000 €</option>
          <option value="not-defined">Je ne sais pas encore</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="message" className={labelClass}>
            Votre projet <span className="text-[#d00018]">*</span>
          </label>

          <span className="text-[11px] text-neutral-700">
            Soyez aussi précis que possible
          </span>
        </div>

        <textarea
          id="message"
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          placeholder="Décrivez votre projet, vos objectifs et vos besoins..."
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
              Envoi en cours...
            </>
          ) : (
            <>
              Envoyer ma demande
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
          Les informations transmises seront utilisées pour traiter votre
          demande et vous recontacter au sujet de votre projet.
        </p>
      </div>
    </form>
  );
}